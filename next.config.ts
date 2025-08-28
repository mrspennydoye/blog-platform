import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['conduit-api.learnwebdriverio.com', 'i.stack.imgur.com'],
  },
};

export default nextConfig;
