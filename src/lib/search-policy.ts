export function getSearchPolicy(env: Record<string, string | undefined> = process.env) {
  const siteUrl = env.SITE_URL?.trim() || "http://127.0.0.1:3000";
  const indexable = env.SEARCH_INDEXING_ENABLED === "true";
  const url = new URL(siteUrl);

  if (indexable && (
    !env.SITE_URL || url.protocol !== "https:" || url.username || url.password || url.search || url.hash ||
    /^(localhost|127\..*|0\.0\.0\.0|\[::1\])$|\.(localhost|local)$/i.test(url.hostname)
  )) {
    throw new Error("Search indexing requires an explicit public HTTPS SITE_URL without credentials, query or fragment.");
  }

  // This switch does not authorize a launch. Complete the pre-launch checklist
  // (including real RFQ delivery) before explicitly enabling it.
  return { siteUrl, indexable };
}
