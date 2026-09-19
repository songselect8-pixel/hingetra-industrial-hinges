export type InquiryReceipt = { received: true; inquiryId: string };

// A static-host fallback can return HTML with status 200. That is not an inquiry receipt.
export async function readInquiryReceipt(response: Response): Promise<InquiryReceipt> {
  const result = await response.json().catch(() => null) as { received?: unknown; inquiryId?: unknown; error?: unknown } | null;
  if (!response.ok || result?.received !== true || typeof result.inquiryId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result.inquiryId)) {
    throw new Error(typeof result?.error === "string" ? result.error : "No saved-inquiry confirmation was received. Your entries are preserved. Please retry or email cindy@hingetra.com.");
  }
  return { received: true, inquiryId: result.inquiryId };
}

export async function postInquiry(endpoint: string, body: FormData) {
  const target = new URL(endpoint, window.location.origin);
  if (target.origin !== window.location.origin || !["/api/inquiries", "/api/inquiries/"].includes(target.pathname) || target.search || target.hash) {
    throw new Error("Inquiry submission is not configured correctly. Please email cindy@hingetra.com.");
  }
  const response = await fetch(endpoint, { method: "POST", body, signal: AbortSignal.timeout(60000) });
  return readInquiryReceipt(response);
}
