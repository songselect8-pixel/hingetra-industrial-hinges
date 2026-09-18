"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { families } from "@/data/catalog";
import { navigation, site } from "@/data/site";
import { Arrow, Chevron } from "@/components/ui/Arrow";
import { CatalogLink } from "@/components/products/CatalogLink";
import { productHref } from "@/data/products";
import { BrandLogo } from "./BrandLogo";

const productGroups = [
  { label: "Water-drop profiles", ids: ["bearing", "pin", "gasket", "grease-nipple"] },
  { label: "Catalog series", ids: ["20-type", "12-14-16-type"] },
  { label: "Other configurations", ids: ["round", "adjustable", "square", "flag"] },
];

export function Header({ currentPage = "home", rfqHref }: { currentPage?: "home" | "products" | "applications" | "custom-hinges" | "manufacturing" | "quality" | "resources" | "about-us" | "contact"; rfqHref?: string }) {
  const homeHref = (destination: string) => {
    if (destination === "#rfq" && rfqHref) return rfqHref;
    if (destination.startsWith("/")) return destination;
    return currentPage === "home" ? destination : `/${destination}`;
  };
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const productTrigger = useRef<HTMLAnchorElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function closeMenus() {
    setProductsOpen(false);
    setMobileOpen(false);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && (mobileOpen || productsOpen)) {
        setProductsOpen(false);
        setMobileOpen(false);
        (mobileOpen ? mobileTrigger : productTrigger).current?.focus();
      }
    }
    function onOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) closeMenus();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [mobileOpen, productsOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1200px)");
    const reset = () => closeMenus();
    breakpoint.addEventListener("change", reset);
    return () => {
      breakpoint.removeEventListener("change", reset);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const menuContent = (isMobile = false) => (
    <>
      {productGroups.map((group) => (
        <div className="mega-group" key={group.label}>
          <p className="micro-label">{group.label}</p>
          {group.ids.map((id) => {
            const family = families.find((item) => item.id === id)!;
            return <CatalogLink key={id} familyId={id} href={productHref(id)} onNavigate={closeMenus}>{family.shortName}<Arrow /></CatalogLink>;
          })}
        </div>
      ))}
      {!isMobile && (
        <div className="mega-custom">
          <span className="micro-label">A different requirement?</span>
          <p>Start with <br />your drawing.</p>
          <Link href="/custom-hinges" onClick={closeMenus}>Explore custom hinges <Arrow /></Link>
        </div>
      )}
    </>
  );

  return (
    <>
      <Link href="#main-content" className="skip-link">Skip to content</Link>
      <div className="utility-bar">
        <div className="shell utility-content">
          <span>FACTORY-DIRECT INDUSTRIAL HINGES</span>
          <span className="utility-secondary">Standard profiles. Custom requirements.</span>
        </div>
      </div>
      <header className="site-header" ref={root}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenus(); }}
        onMouseLeave={() => { if (!mobileOpen && !root.current?.querySelector(".mega-menu")?.contains(document.activeElement)) { setProductsOpen(false); if (hoverTimer.current) clearTimeout(hoverTimer.current); } }}>
        <div className="shell header-inner">
          <Link className="brand" href={homeHref("#home")} aria-label={`${site.brand} home`} onClick={closeMenus}>
            <BrandLogo preload />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href={homeHref("#home")} className={currentPage === "home" ? "nav-home" : undefined} aria-current={currentPage === "home" ? "page" : undefined} onClick={closeMenus}>Home</Link>
            <Link
              ref={productTrigger}
              href="/products"
              className={`nav-products${currentPage === "products" ? " nav-home" : ""}${productsOpen ? " is-open" : ""}`}
              aria-current={currentPage === "products" ? "page" : undefined}
              aria-haspopup="true"
              aria-expanded={productsOpen}
              aria-controls="product-mega-menu"
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || (event.key === "Tab" && !event.shiftKey && productsOpen)) {
                  event.preventDefault();
                  setProductsOpen(true);
                  requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>(".mega-menu a")?.focus());
                }
              }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") hoverTimer.current = setTimeout(() => setProductsOpen(true), 180);
              }}
              onClick={closeMenus}
            >Products <Chevron /></Link>
            {navigation.slice(1).map((item) => {
              const isCurrent = (currentPage === "applications" && item.label === "Applications") || (currentPage === "custom-hinges" && item.label === "Custom Hinges") || (currentPage === "manufacturing" && item.label === "Manufacturing") || (currentPage === "quality" && item.label === "Quality") || (currentPage === "resources" && item.label === "Resources") || (currentPage === "about-us" && item.label === "About Us") || (currentPage === "contact" && item.label === "Contact");
              return <Link key={item.label} href={homeHref(item.href)} className={isCurrent ? "nav-home" : undefined} aria-current={isCurrent ? "page" : undefined} onClick={closeMenus}>{item.label}</Link>;
            })}
          </nav>
          <Link href={homeHref("#rfq")} className="button button-primary header-quote" onClick={closeMenus}>Get a Quote <Arrow /></Link>
          <button
            type="button" className="menu-toggle" ref={mobileTrigger}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen} aria-controls="mobile-navigation"
            onClick={() => { setMobileOpen((open) => !open); setProductsOpen(false); }}
          ><span className={mobileOpen ? "menu-lines is-open" : "menu-lines"}><i /><i /></span></button>
        </div>
        {productsOpen && !mobileOpen && (
          <nav className="mega-menu" id="product-mega-menu" aria-label="Product categories" onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const links = event.currentTarget.querySelectorAll<HTMLAnchorElement>("a");
            if (event.shiftKey && document.activeElement === links[0]) {
              event.preventDefault();
              productTrigger.current?.focus();
            } else if (!event.shiftKey && document.activeElement === links[links.length - 1]) {
              event.preventDefault();
              closeMenus();
              root.current?.querySelector<HTMLAnchorElement>('.desktop-nav a[href$="/applications"], .desktop-nav a[href$="/applications/"]')?.focus();
            }
          }}>
            <div className="shell mega-grid">{menuContent()}</div>
            <div className="shell mega-bottom"><Link href="/products" onClick={closeMenus}>Explore the complete catalog range <Arrow /></Link><span>Original catalog dimensions. Clear product selection.</span></div>
          </nav>
        )}
        {mobileOpen && (
          <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation">
            <div className="shell">
              <Link href={homeHref("#home")} onClick={closeMenus}>Home <Arrow /></Link>
              <button type="button" aria-expanded={productsOpen} aria-controls="mobile-products" onClick={() => setProductsOpen((open) => !open)}>Products <Chevron /></button>
              {productsOpen && <div className="mobile-products" id="mobile-products"><div className="mega-group"><Link href="/products" onClick={closeMenus}>View all hinge types <Arrow /></Link></div>{menuContent(true)}</div>}
              {navigation.slice(1).map((item) => {
                const isCurrent = (currentPage === "applications" && item.label === "Applications") || (currentPage === "custom-hinges" && item.label === "Custom Hinges") || (currentPage === "manufacturing" && item.label === "Manufacturing") || (currentPage === "quality" && item.label === "Quality") || (currentPage === "resources" && item.label === "Resources") || (currentPage === "about-us" && item.label === "About Us") || (currentPage === "contact" && item.label === "Contact");
                return <Link key={item.label} href={homeHref(item.href)} aria-current={isCurrent ? "page" : undefined} onClick={closeMenus}>{item.label}<Arrow /></Link>;
              })}
              <Link href={homeHref("#rfq")} className="button button-primary mobile-menu-quote" onClick={closeMenus}>Discuss your requirement <Arrow /></Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
