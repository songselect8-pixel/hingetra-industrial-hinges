import Link from "next/link";
import Image from "next/image";
import type { MouseEvent, ReactNode } from "react";
import { getVariants, type CatalogFamily } from "@/data/catalog";
import { CatalogLink } from "./CatalogLink";
import { Arrow } from "@/components/ui/Arrow";

export function ProductCard({ family, index, href, onViewDetails, countLabel, children, quoteHref, actionLabel = "View products", eager = false }: {
  family: CatalogFamily;
  index: number;
  href?: string;
  onViewDetails?: (event: MouseEvent<HTMLAnchorElement>) => void;
  countLabel?: string;
  children?: ReactNode;
  quoteHref?: string;
  actionLabel?: string;
  eager?: boolean;
}) {
  return (
    <article className="product-card">
      <CatalogLink familyId={family.id} href={href} onClick={onViewDetails} className="product-image-link" ariaLabel={`${String(index + 1).padStart(2, "0")} ${family.profile}: View ${family.name}`}>
        <div className="product-image-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{family.profile}</span></div>
        <Image src={family.image} alt={family.imageAlt} width={800} height={800} quality={85} loading={eager ? "eager" : undefined} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw" className={`product-card-image product-image-${family.id}`} />
        <span className="product-image-arrow"><Arrow diagonal /></span>
      </CatalogLink>
      <div className="product-card-copy">
        <div className="product-card-title"><h3>{family.shortName}</h3><span>{countLabel ?? `${getVariants(family.id).length} catalog sizes`}</span></div>
        <p>{family.description}</p>
        {children}
        {quoteHref ? <div className="product-card-actions">
          <CatalogLink familyId={family.id} href={href} onClick={onViewDetails} className="text-link" ariaLabel={`${actionLabel} for ${family.name}`}>{actionLabel} <Arrow /></CatalogLink>
          <Link href={quoteHref} className="text-link product-card-quote" aria-label={`Request a quote for ${family.name}`}>Request a Quote</Link>
        </div> : <CatalogLink familyId={family.id} href={href} onClick={onViewDetails} className="text-link">{actionLabel} <Arrow /></CatalogLink>}
      </div>
    </article>
  );
}
