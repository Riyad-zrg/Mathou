#Base
FROM node:24 AS debelopment

WORKDIR /backend
COPY package*.json /.
RUN npm i

COPY . .

RUN npx prisma generate && npm run build

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN ["chmod", "+x", "/docker-entrypoint.sh"]
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["npm","run","start:dev"]

#prod

FROM node:24 AS production
WORKDIR /backend
COPY . ./
RUN npm ci
CMD ["npm", "run", "start:prod"]


