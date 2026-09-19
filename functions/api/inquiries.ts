import { receiveInquiry, type InquiryEnvironment } from "../../server/inquiries.ts";

// Pages Functions run separately from the statically exported Next.js site.
export function onRequest(context: {
  request: Request;
  env: InquiryEnvironment;
  waitUntil: (promise: Promise<unknown>) => void;
}) {
  return receiveInquiry(context.request, context.env, (promise) => context.waitUntil(promise));
}
