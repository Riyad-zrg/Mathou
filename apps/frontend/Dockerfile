ARG NODE_VERSION=24


FROM node:${NODE_VERSION} AS builder

WORKDIR /frontend

COPY package*.json /.

RUN npm i

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:${NODE_VERSION} AS production
WORKDIR /frontend

ENV NEXT_TELEMETRY_DISABLED=1

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /frontend/.next/standalone ./
COPY --from=builder --chown=node:node /frontend/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]