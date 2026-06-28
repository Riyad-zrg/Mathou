ARG NODE_VERSION=24


FROM node:${NODE_VERSION} AS builder

WORKDIR /frontend

COPY package*.json /.

RUN npm i

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:${NODE_VERSION} AS production

ENV NEXT_TELEMETRY_DISABLED=1

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder /frontend/.next/standalone ./
COPY --from=builder /frontend/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "frontend/server.js"]