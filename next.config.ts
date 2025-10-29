/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
