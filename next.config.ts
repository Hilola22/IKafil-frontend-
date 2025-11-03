/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const nextConfig: NextConfig = {
  images: {
    domains: ["www.eclosio.ong", "3.76.183.255", "api.ikafil.uz"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.apple.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
