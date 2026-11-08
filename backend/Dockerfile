FROM node:20-bookworm-slim AS dependencies
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:20-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN groupadd --system nora && useradd --system --gid nora nora
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
COPY backend/src ./src
COPY db/migrations ./db/migrations
USER nora
EXPOSE 8080
CMD ["node", "--env-file=.env", "src/index.js"]
