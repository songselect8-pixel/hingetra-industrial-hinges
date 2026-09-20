import type { Ref } from "react";
import styles from "./InquiryResult.module.css";

export function InquiryResult({ success, resultRef, id }: { success: boolean; resultRef: Ref<HTMLDivElement>; id?: string }) {
  return (
    <div id={id} ref={resultRef} tabIndex={-1} role={success ? "status" : "alert"} className={`${success ? `form-notice ${styles.success}` : "form-error-summary"} ${styles.result}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d={success ? "m7.5 12 3 3 6-6" : "m8.5 8.5 7 7m0-7-7 7"} />
      </svg>
      <strong>{success ? "Sent successfully" : "Send failed"}</strong>
    </div>
  );
}
