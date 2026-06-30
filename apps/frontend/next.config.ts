import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: process.env.NODE_ENV === "development" ? { root: "." } : undefined,
};

export default nextConfig;
