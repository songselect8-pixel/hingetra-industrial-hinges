export function joinSiteUrl(baseUrl: string, pathname: string) {
  // Keep the GitHub Pages base path. Page URLs use the exported trailing-slash
  // canonical; files such as drawings, images and the sitemap do not.
  const url = new URL(`${baseUrl.replace(/\/+$/, "")}/${pathname.replace(/^\/+/, "")}`);
  if (!url.pathname.endsWith("/") && !/\.[^/]+$/.test(url.pathname)) url.pathname += "/";
  return url.href;
}
