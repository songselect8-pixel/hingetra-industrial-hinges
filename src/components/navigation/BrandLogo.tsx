import Image from "next/image";
import { site } from "@/data/site";

export function BrandLogo({ preload = false }: { preload?: boolean }) {
  return (
    <Image
      className="brand-logo"
      src={site.logo}
      alt={`${site.brand} — ${site.descriptor}`}
      width={960}
      height={155}
      sizes="(max-width: 599px) 170px, 224px"
      preload={preload}
    />
  );
}
