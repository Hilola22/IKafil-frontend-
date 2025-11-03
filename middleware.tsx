import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: true,
});

export default function middleware(req: any) {
  const { pathname, search } = req.nextUrl;
  const locales = routing.locales as unknown as string[];
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  const isAPI = pathname.startsWith("/api");

  if (!hasLocale && pathname !== "/" && !isAPI) {
    const url = req.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}${pathname}`;
    url.search = search || "";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/((?!_next|.*\\..*).*)"],
};
