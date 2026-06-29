#Base
FROM node:24 AS build

WORKDIR /backend
COPY package*.json /.
RUN npm i

COPY . .

RUN npx prisma generate && npm run build

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN ["chmod", "+x", "/docker-entrypoint.sh"]
ENTRYPOINT ["/docker-entrypoint.sh"]

FROM build AS development
CMD ["npm","run","start:dev"]

#prod

FROM node:24 AS production
WORKDIR /backend
COPY --from=build /backend/dist ./dist
COPY --from=build /backend/package*.json ./

ENV PORT=4000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "npm ci && npm run start:prod"]


