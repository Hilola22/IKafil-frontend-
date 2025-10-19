/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
