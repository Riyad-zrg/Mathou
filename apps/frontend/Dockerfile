FROM node:lts-alpine AS base

FROM base AS deps
WORKDIR /frontend
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_SERVER_URL="https://socatoa.eu"
RUN npm run build

FROM node:24 AS development

WORKDIR /frontend
COPY package*.json /.

RUN npm install

COPY . .
EXPOSE ${PORT}
CMD ["npm", "run","dev"]

FROM base AS production
WORKDIR /frontend

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /frontend/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]