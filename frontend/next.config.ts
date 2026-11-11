import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  /* pas d'indicateur dev-tools en démo */
  devIndicators: false,
};

export default nextConfig;
