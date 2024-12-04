import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",
  images: {
    domains: [""],
  },
  trailingSlash: true,
  compress: true,
};

export default nextConfig;
