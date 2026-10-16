function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function withProtocol(value: string): string {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return stripTrailingSlash(trimmed);
  return stripTrailingSlash(`https://${trimmed}`);
}

function isLocalUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

/** Случайный *.vercel.app не должен стать публичным canonical. */
function isVercelAppUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

/** Канонический production-origin (sitemap, canonical, OG, JSON-LD). */
const PRODUCTION_SITE_URL = "https://chujai-biryon-bokhtar.com";

/**
 * Публичный origin для canonical, sitemap и Open Graph.
 * Сначала NEXT_PUBLIC_SITE_URL. На Vercel localhost из примера не используется:
 * вместо него берётся основной домен. Значения *.vercel.app игнорируются.
 */
export function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const onVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

  if (configured) {
    const normalized = withProtocol(configured);
    if (isVercelAppUrl(normalized)) {
      return PRODUCTION_SITE_URL;
    }
    if (onVercel && isLocalUrl(normalized)) {
      return PRODUCTION_SITE_URL;
    }
    return normalized;
  }

  if (onVercel) return PRODUCTION_SITE_URL;

  return "http://localhost:3000";
}

/** Preview-деплои Vercel не должны попадать в индекс. */
export function isPreviewDeployment(): boolean {
  return process.env.VERCEL_ENV === "preview";
}
