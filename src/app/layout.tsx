import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { joinSiteUrl } from "@/lib/site-url";
import { getSearchPolicy } from "@/lib/search-policy";
import "./globals.css";

const plex = localFont({
  src: [
    { path: "../assets/fonts/IBMPlexSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/IBMPlexSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/IBMPlexSans-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex",
  display: "swap",
});

const { siteUrl: baseUrl, indexable } = getSearchPolicy();
const homeUrl = joinSiteUrl(baseUrl, "/");
const organizationId = `${homeUrl}#organization`;
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": organizationId,
      name: site.companyName, alternateName: site.brand, url: homeUrl,
      logo: { "@type": "ImageObject", url: joinSiteUrl(baseUrl, site.logo), width: 960, height: 155 },
    },
    {
      "@type": "WebSite", "@id": `${homeUrl}#website`,
      name: site.companyName, alternateName: site.brand, url: homeUrl,
      inLanguage: "en", publisher: { "@id": organizationId },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  robots: { index: indexable, follow: indexable },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined,
    other: process.env.BING_SITE_VERIFICATION?.trim()
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION.trim() } : undefined,
  },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.brand,
    images: [{ url: "/images/hinge-pin-hero.jpg", width: 5252, height: 3505, alt: `${site.brand} water-drop weld-on hinge products` }],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0D2238" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={plex.variable}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c") }} /></body></html>;
}
