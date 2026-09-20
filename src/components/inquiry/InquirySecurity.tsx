"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: Turnstile } }

export function InquirySecurity({ attempt }: { attempt: number }) {
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!ready || !sitekey || !container.current || !window.turnstile) return;
    setFailed(false);
    const widget = window.turnstile.render(container.current, {
      sitekey, action: "rfq", theme: "auto", size: "flexible",
      "error-callback": () => { setFailed(true); },
      callback: () => { setFailed(false); },
    });
    return () => { window.turnstile?.remove(widget); };
  }, [ready, sitekey, attempt]);

  if (!sitekey) return <p className="field-error" role="alert">Inquiry submission is not ready. Please email cindy@hingetra.com.</p>;
  return <div className="field field-full">
    <Script id="inquiry-turnstile" src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} onError={() => setFailed(true)} />
    <div ref={container} />
    {failed && <p className="field-error" role="alert">The security check could not load. Reload this page, or email cindy@hingetra.com.</p>}
  </div>;
}

export function InquiryPrivacy() {
  return <details className="contact-privacy-note">
    <summary>How your inquiry data is used</summary>
    <p>HINGETRA uses your contact details, requirements and chosen files to respond to this inquiry and keep a record of the discussion. Please send only information needed for your request and files you are authorized to share.</p>
    <p>Cloudflare processes and stores submissions and private attachments; Resend sends your inquiry details and copies of your chosen files to our sales mailbox, hosted by Alibaba Mail. These providers may process data outside your country. No public attachment link is created.</p>
    <p>We retain inquiries for handling and follow-up, with access limited to authorized account users. To request access, correction or deletion, email <a href="mailto:cindy@hingetra.com">cindy@hingetra.com</a>. Retention and deletion requests are handled by the site owner, including copies in the sales mailbox. This form does not subscribe you to marketing emails.</p>
  </details>;
}
