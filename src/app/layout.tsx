import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
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

const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
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
  return <html lang="en" className={plex.variable}><body>{children}</body></html>;
}
