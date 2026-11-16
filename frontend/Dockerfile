# ============================================================
#  NORA frontend — Next.js 16 (sortie standalone) servi par Bun
# ============================================================

# ---------- dépendances ----------
FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install

# ---------- build ----------
FROM oven/bun:1-alpine AS build
WORKDIR /app
# Variable publique Next : doit être présente au BUILD (inlinée dans le bundle).
ARG NEXT_PUBLIC_API_URL=/backend/api/v1/app
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1
# Base SQLite interne (prisma generate / next build) — non utilisée en mode backend.
ENV DATABASE_URL=file:../db/custom.db
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bunx prisma generate
# `build` compile Next puis recopie static + public dans .next/standalone
RUN bun run build

# ---------- runtime ----------
FROM oven/bun:1-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
# Sortie standalone autonome (static + public déjà inclus par le script build).
COPY --from=build /app/.next/standalone ./.next/standalone
EXPOSE 3000
CMD ["bun", ".next/standalone/server.js"]
