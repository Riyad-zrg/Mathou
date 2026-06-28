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


#prod

FROM node:24 AS production
WORKDIR /backend
COPY --from=build /backend/dist ./dist
COPY --from=build /backend/package*.json ./

CMD ["sh", "-c", "npm ci && npm run start:prod"]


