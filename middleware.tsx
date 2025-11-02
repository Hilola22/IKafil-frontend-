import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware({
  locales: routing.locales, 
  defaultLocale: routing.defaultLocale,
  localeDetection: true, 
});

export const config = {
  matcher: [
    "/",
    "/(en|uz|ru)/:path*", 
  ],
};
