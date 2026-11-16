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
  /* autorise l'accès au serveur de dev via http://127.0.0.1:3000 */
  allowedDevOrigins: ["127.0.0.1"],
  /* le proxy /backend coupe à 30 s par défaut : trop court pour l'IA en local */
  experimental: { proxyTimeout: 190_000 },
  /* Proxy vers le backend Fastify : le navigateur ne parle qu'à Next (même origine),
     donc les cookies de session httpOnly fonctionnent sans CORS, sur localhost comme
     sur 127.0.0.1. Activé en mettant NEXT_PUBLIC_API_URL=/backend/api/v1/app. */
  async rewrites() {
    const backend = process.env.BACKEND_URL ?? "http://localhost:8080";
    return [{ source: "/backend/:path*", destination: `${backend}/:path*` }];
  },
};

export default nextConfig;
