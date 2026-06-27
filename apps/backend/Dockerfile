#Base
FROM node:24 AS base

WORKDIR /backend
COPY package*.json /.

#Dev

FROM base AS dev 

RUN npm i

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 4000

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN ["chmod", "+x", "/docker-entrypoint.sh"]
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["npm","run","start:dev"]

#prod

FROM base as prod

RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 4000

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN ["chmod", "+x", "/docker-entrypoint.sh"]
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["npm","run","start:prod"]