import { quickContact, quickContactLinks } from "@/data/quick-contact";

export function FloatingActions() {
  const demo = quickContact.isPlaceholder;
  return (
    <nav className="floating-actions" aria-label="Quick contact and page navigation" data-contact-mode={demo ? "demo" : "live"}>
      {demo && <span className="floating-actions-status">Demo contacts</span>}
      <a className="floating-action floating-action-whatsapp" href={quickContactLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={demo ? "WhatsApp — demo number, not an active contact" : "Contact HINGETRA on WhatsApp"}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.6L3 20.5l1.3-4.6a8.6 8.6 0 1 1 16.2-4.3Z" /><path d="m8.1 7.3 1.5-.2 1.1 2.7-1 1.1a9.3 9.3 0 0 0 3.4 3.3l1-1 2.7 1.2-.2 1.5c-.1.7-.9 1.2-1.6 1-4.2-.9-7.3-4-8.2-8.1-.2-.7.5-1.4 1.3-1.5Z" /></svg>
        <span className="floating-action-label">WhatsApp{demo && <small>Demo number · not active</small>}</span>
      </a>
      <a className="floating-action floating-action-email" href={quickContactLinks.email} aria-label={demo ? "Email — demo address, not an active mailbox" : "Email HINGETRA"}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 5.5h17v13h-17z" /><path d="m4 6 8 7 8-7" /></svg>
        <span className="floating-action-label">Email{demo && <small>Demo address · not active</small>}</span>
      </a>
      <a className="floating-action floating-action-top" href="#site-top" aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
        <span className="floating-action-label">Back to top</span>
      </a>
    </nav>
  );
}
