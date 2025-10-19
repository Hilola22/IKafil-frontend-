/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.eclosio.ong", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
