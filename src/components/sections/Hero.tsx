import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <Eyebrow>Made for industry</Eyebrow>
          <h1 id="hero-title">Industrial <br /><span className="hero-title-line">weld-on hinges.</span></h1>
          <p className="hero-lead">Built for heavy-duty applications.</p>
          <p className="hero-description">Factory-direct hinges for steel doors, gates, trailers and industrial cabinets. Standard profiles and custom manufacturing, built around your requirements.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="#rfq">Get a Quote <Arrow /></Link>
            <Link className="button button-outline" href="#products">Explore Hinges <Arrow diagonal /></Link>
          </div>
          <div className="hero-capabilities"><span>Standard hinges</span><span>Custom manufacturing</span></div>
        </div>
        <figure className="hero-visual">
          <div className="hero-image-label"><span>THE WELD-ON COLLECTION</span><span>2026</span></div>
          <Image src="/images/hinge-pin-hero.jpg" alt="Water-drop weld-on hinges with an exposed pin and separated hinge body" width={5252} height={3505} loading="eager" fetchPriority="high" quality={90} sizes="(max-width: 768px) 100vw, 55vw" className="hero-product-image" />
          <figcaption className="hero-image-caption"><div><span className="micro-label">A closer look</span><p>Water-drop profile. Pin construction.</p></div><Link href="#range-pin" aria-label="View pin-type hinge specifications" className="hero-image-link"><Arrow diagonal /></Link></figcaption>
        </figure>
      </div>
      <div className="shell hero-bottom"><p>Hinges that start with your requirements.</p><Link href="#products">Discover the range <span aria-hidden="true">↓</span></Link></div>
    </section>
  );
}
