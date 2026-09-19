import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { receiveInquiry, type InquiryEnvironment } from "../server/inquiries.ts";
import { readInquiryReceipt } from "../src/lib/rfq-delivery.ts";

function fixture(options: { mailFails?: boolean; dbFails?: boolean; ambiguousCommit?: boolean; uploadFails?: boolean; turnstile?: object } = {}) {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(readFileSync("migrations/0001_inquiries.sql", "utf8"));
  const objects = new Map<string, ArrayBuffer>();
  const emails: Record<string, unknown>[] = [];
  const tasks: Promise<unknown>[] = [];
  let ambiguous = options.ambiguousCommit;
  const env: InquiryEnvironment = {
    RFQ_ENABLED: "true", RFQ_FROM_EMAIL: "inquiry@forms.hingetra.com",
    TURNSTILE_SECRET_KEY: "test-secret", RFQ_RATE_LIMIT_SECRET: "test-only-rate-secret-at-least-32-characters", RESEND_API_KEY: "test-key",
    INQUIRY_DB: { prepare(sql: string) {
      let bindings: (string | number | null)[] = [];
      return {
        bind(...values: (string | number | null)[]) { bindings = values; return this; },
        async first<T>() {
          if (options.dbFails && sql.startsWith("INSERT INTO inquiries")) throw new Error("database unavailable");
          const row = sqlite.prepare(sql).get(...bindings);
          if (ambiguous && sql.startsWith("INSERT INTO inquiries")) { ambiguous = false; throw new Error("response lost after commit"); }
          return (row ?? null) as T | null;
        },
        async run() { return sqlite.prepare(sql).run(...bindings); },
      };
    } },
    INQUIRY_FILES: {
      async put(key, stream, metadata) {
        assert.equal(metadata.httpMetadata.contentType, "application/octet-stream");
        objects.set(key, await new Response(stream).arrayBuffer());
        if (options.uploadFails) throw new Error("upload failed");
      },
      async delete(keys) { for (const key of keys) objects.delete(key); },
    },
  };
  const fetcher: typeof fetch = async (url, init) => {
    if (String(url).includes("siteverify")) return Response.json(options.turnstile ?? { success: true, hostname: "hingetra.com", action: "rfq" });
    assert.equal(String(url), "https://api.resend.com/emails");
    const email = JSON.parse(String(init?.body));
    emails.push(email);
    assert.ok(new Headers(init?.headers).get("Idempotency-Key")?.startsWith("rfq-"));
    return options.mailFails ? Response.json({ error: "temporary" }, { status: 503 }) : Response.json({ id: "mail-test-id" });
  };
  return { sqlite, env, objects, emails,
    async send(form: FormData, headers: Record<string, string> = {}, url = "https://hingetra.com/api/inquiries") {
      // Model already encoded HTTP bytes. Cancelling Node's live FormData encoder
      // triggers an unrelated undici enqueue-after-close error on oversized files.
      const encoded = new Response(form);
      const body = await encoded.arrayBuffer();
      const response = await receiveInquiry(new Request(url, { method: "POST", body, headers: { "Content-Type": encoded.headers.get("content-type")!, Origin: "https://hingetra.com", "CF-Connecting-IP": "192.0.2.1", ...headers } }), env, (task) => { tasks.push(task); }, fetcher);
      await Promise.all(tasks);
      return response;
    },
  };
}

function form(kind = "contact", id = crypto.randomUUID()) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: "Test buyer", company: "Test company", email: "buyer@example.com", country: "Test region", formKind: kind, sourcePath: "/contact/", requestId: id, "cf-turnstile-response": "test-token", ...(kind === "contact" ? { productType: "bearing" } : { product: "custom" }) })) data.set(key, value);
  return data;
}
const pdf = () => new File(["%PDF-1.7\nsynthetic test only"], "drawing.pdf", { type: "application/pdf" });

test("contact and catalog submissions save records before notifying a fixed recipient", async () => {
  for (const kind of ["contact", "catalog"]) {
    const f = fixture();
    const data = form(kind);
    data.set("message", "Dimensions to discuss");
    data.set("drawing", pdf());
    const response = await f.send(data);
    assert.equal(response.status, 201);
    const receipt = await readInquiryReceipt(response);
    const row = f.sqlite.prepare("SELECT * FROM inquiries WHERE id = ?").get(receipt.inquiryId)!;
    assert.equal(row.notification_status, "accepted");
    assert.equal(row.email, "buyer@example.com");
    assert.equal(row.follow_up_status, "new");
    assert.equal(JSON.parse(String(row.fields_json)).message, "Dimensions to discuss");
    assert.ok(!String(row.fields_json).includes("test-token"));
    const files = JSON.parse(String(row.attachments_json));
    assert.equal(files[0].name, "drawing.pdf");
    assert.ok(f.objects.has(files[0].key));
    assert.deepEqual(f.emails[0].to, ["cindy@hingetra.com"]);
    assert.equal(f.emails[0].reply_to, "buyer@example.com");
    assert.ok(String(f.emails[0].text).includes(files[0].key));
    f.sqlite.close();
  }
});

test("email failure retains the inquiry and private attachment without claiming inbox delivery", async () => {
  const f = fixture({ mailFails: true });
  const data = form(); data.set("drawing", pdf());
  const response = await f.send(data);
  assert.equal((await readInquiryReceipt(response)).received, true);
  assert.equal(f.sqlite.prepare("SELECT notification_status FROM inquiries").get()?.notification_status, "failed");
  assert.equal(f.objects.size, 1);
  f.sqlite.close();
});

test("retries are idempotent; changed payloads cannot overwrite an existing inquiry", async () => {
  const f = fixture(); const id = crypto.randomUUID();
  const data = form("contact", id); data.set("drawing", pdf());
  assert.equal((await f.send(data)).status, 201);
  assert.equal((await f.send(data)).status, 201);
  assert.equal(f.emails.length, 1); assert.equal(f.objects.size, 1);
  data.set("message", "different payload");
  assert.equal((await f.send(data)).status, 409);
  assert.equal(f.sqlite.prepare("SELECT COUNT(*) AS total FROM inquiries").get()?.total, 1);
  f.sqlite.close();
});

test("storage failures never acknowledge receipt or send notifications", async () => {
  for (const failure of [{ dbFails: true }, { uploadFails: true }]) {
    const f = fixture(failure); const data = form(); data.set("drawing", pdf());
    const response = await f.send(data);
    assert.equal(response.status, 503);
    await assert.rejects(readInquiryReceipt(response));
    assert.equal(f.emails.length, 0);
    assert.equal(f.sqlite.prepare("SELECT COUNT(*) AS total FROM inquiries").get()?.total, 0);
    if (failure.uploadFails) assert.equal(f.objects.size, 0);
    f.sqlite.close();
  }
});

test("concurrent retries keep one record, one notification and the winning private attachment", async () => {
  const f = fixture(); const id = crypto.randomUUID();
  const left = form("contact", id); left.set("drawing", pdf());
  const right = form("contact", id); right.set("drawing", pdf());
  const responses = await Promise.all([f.send(left), f.send(right)]);
  assert.deepEqual(responses.map((response) => response.status), [201, 201]);
  assert.equal(f.emails.length, 1); assert.equal(f.objects.size, 1);
  const stored = f.sqlite.prepare("SELECT attachments_json FROM inquiries").get()!;
  assert.ok(f.objects.has(JSON.parse(String(stored.attachments_json))[0].key));
  f.sqlite.close();
});

test("Contact saves both files; catalog forms retain their advertised STEP support", async () => {
  const f = fixture(); const contact = form();
  contact.set("drawing", pdf());
  contact.set("referenceImage", new File([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0])], "reference.png"));
  assert.equal((await f.send(contact)).status, 201);
  assert.equal(f.objects.size, 2);
  const catalog = form("catalog");
  catalog.set("drawing", new File(["ISO-10303-21;\nHEADER;"], "hinge.step"));
  assert.equal((await f.send(catalog)).status, 201);
  const wrongContact = form();
  wrongContact.set("drawing", catalog.get("drawing")!);
  assert.equal((await f.send(wrongContact)).status, 400);
  f.sqlite.close();
});

test("an ambiguous database commit never deletes referenced uploads; retry recovers the receipt", async () => {
  const f = fixture({ ambiguousCommit: true });
  const data = form(); data.set("drawing", pdf());
  assert.equal((await f.send(data)).status, 503);
  assert.equal((await f.send(data)).status, 201);
  const stored = f.sqlite.prepare("SELECT attachments_json, notification_status FROM inquiries").get()!;
  assert.ok(f.objects.has(JSON.parse(String(stored.attachments_json))[0].key));
  assert.equal(stored.notification_status, "pending"); // Visible to the owner for recovery.
  f.sqlite.close();
});

test("activation, origin and Turnstile all fail closed", async () => {
  const f = fixture();
  f.env.RFQ_ENABLED = "false";
  assert.equal((await f.send(form())).status, 503);
  f.env.RFQ_ENABLED = "true";
  assert.equal((await f.send(form(), { Origin: "https://evil.example" })).status, 403);
  assert.equal((await f.send(form(), {}, "https://preview.pages.dev/api/inquiries")).status, 403);
  f.sqlite.close();
  for (const result of [{ success: false }, { success: true, hostname: "evil.example", action: "rfq" }, { success: true, hostname: "hingetra.com", action: "login" }]) {
    const blocked = fixture({ turnstile: result });
    assert.equal((await blocked.send(form())).status, 400);
    assert.equal(blocked.emails.length, 0); assert.equal(blocked.objects.size, 0);
    blocked.sqlite.close();
  }
});

test("server rejects bypassed validation, header injection, unknown fields and disguised files", async () => {
  const mutations = [
    (data: FormData) => data.set("company", ""),
    (data: FormData) => data.set("name", "x".repeat(121)),
    (data: FormData) => data.set("email", "buyer@example.com\r\nBcc: attacker@example.com"),
    (data: FormData) => data.set("to", "attacker@example.com"),
    (data: FormData) => data.append("email", "other@example.com"),
    (data: FormData) => data.set("productType", "invented"),
    (data: FormData) => data.set("drawing", new File(["<script>no</script>"], "drawing.pdf")),
    (data: FormData) => data.set("drawing", new File(["%PDF-1.7"], "../drawing.pdf")),
    (data: FormData) => data.set("referenceImage", new File(["%PDF-1.7"], "image.png")),
  ];
  for (const mutation of mutations) {
    const f = fixture(); const data = form(); mutation(data);
    assert.equal((await f.send(data)).status, 400);
    assert.equal(f.emails.length, 0); assert.equal(f.objects.size, 0);
    f.sqlite.close();
  }
});

test("upload limits are enforced even without a truthful content length", async () => {
  const f = fixture();
  assert.equal((await f.send(form(), { "Content-Length": String(30 * 1024 * 1024) })).status, 413);
  const data = form(); data.set("drawing", new File(["%PDF-", new Uint8Array(22 * 1024 * 1024)], "large.pdf"));
  assert.equal((await f.send(data, { "Content-Length": "1" })).status, 413);
  assert.equal(f.emails.length, 0);
  f.sqlite.close();
});

test("validated repeated submissions are rate limited without storing raw IP addresses", async () => {
  const f = fixture();
  for (let i = 0; i < 5; i++) assert.equal((await f.send(form())).status, 201);
  const blocked = await f.send(form());
  assert.equal(blocked.status, 429);
  assert.equal(f.emails.length, 5);
  assert.ok(!JSON.stringify(f.sqlite.prepare("SELECT * FROM inquiry_limits").all()).includes("192.0.2.1"));
  f.sqlite.close();
});

test("the browser accepts only a real saved-inquiry receipt, never an HTML 200 or generic success", async () => {
  for (const response of [new Response("<html>static page</html>"), Response.json({ success: true }), Response.json({ received: true, inquiryId: "invalid" }), Response.json({ received: true, inquiryId: crypto.randomUUID() }, { status: 500 })]) {
    await assert.rejects(readInquiryReceipt(response));
  }
});
