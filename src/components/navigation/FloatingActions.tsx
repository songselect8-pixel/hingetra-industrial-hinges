"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { quickContact, quickContactLinks } from "@/data/quick-contact";
import "./floating-actions.css";

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 1);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("pageshow", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("pageshow", updateVisibility);
    };
  }, []);

  const demo = quickContact.isPlaceholder;
  return (
    <><nav className="floating-actions" aria-label="Quick contact and page navigation" data-contact-mode={demo ? "demo" : "live"}>
      {demo && <span className="floating-actions-status">Demo contacts</span>}
      <a className="floating-action floating-action-whatsapp" href={quickContactLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={demo ? "WhatsApp — demo number, not an active contact" : "Contact HINGETRA on WhatsApp"}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.6L3 20.5l1.3-4.6a8.6 8.6 0 1 1 16.2-4.3Z" /><path d="m8.1 7.3 1.5-.2 1.1 2.7-1 1.1a9.3 9.3 0 0 0 3.4 3.3l1-1 2.7 1.2-.2 1.5c-.1.7-.9 1.2-1.6 1-4.2-.9-7.3-4-8.2-8.1-.2-.7.5-1.4 1.3-1.5Z" /></svg>
        <span className="floating-action-label">WhatsApp{demo && <small>Demo number · not active</small>}</span>
      </a>
      <a className="floating-action floating-action-email" href={quickContactLinks.email} aria-label={demo ? "Email — demo address, not an active mailbox" : "Email HINGETRA"}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 5.5h17v13h-17z" /><path d="m4 6 8 7 8-7" /></svg>
        <span className="floating-action-label">Email{demo && <small>Demo address · not active</small>}</span>
      </a>
      <button type="button" className="floating-action floating-action-qr" popoverTarget="whatsapp-qr" aria-haspopup="dialog" aria-label="Show WhatsApp QR code">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h3v3h-6zM12 3v3m0 6h3m6 0v3M3 12h3m6 3v6" /></svg>
        <span className="floating-action-label">WhatsApp QR code</span>
      </button>
      {showBackToTop && <a className="floating-action floating-action-top" href="#site-top" aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
        <span className="floating-action-label">Back to top</span>
      </a>}
    </nav>
    <div id="whatsapp-qr" className="whatsapp-qr-popover" popover="auto" role="dialog" aria-labelledby="whatsapp-qr-title" aria-describedby="whatsapp-qr-description">
      <button type="button" className="whatsapp-qr-close" popoverTarget="whatsapp-qr" popoverTargetAction="hide" aria-label="Close WhatsApp QR code" autoFocus>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
      <h2 id="whatsapp-qr-title">Chat on WhatsApp</h2>
      <p id="whatsapp-qr-description">Scan with WhatsApp, or open the chat below.</p>
      <Image className="whatsapp-qr-image" src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${quickContact.whatsappQrImage}`} alt="WhatsApp contact QR code supplied by HINGETRA" width={522} height={516} unoptimized />
      <p className="whatsapp-qr-number">{quickContact.whatsappNumber}</p>
      <a className="button button-primary" href={quickContactLinks.whatsapp} target="_blank" rel="noopener noreferrer">Open WhatsApp</a>
    </div></>
  );
}
