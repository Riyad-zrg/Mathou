FROM node:24 AS base

WORKDIR /frontend
COPY package*.json /.

RUN npm install

COPY . .
EXPOSE 3000

FROM base AS dev
CMD ["npm", "run","dev"]

FROM base AS prod
CMD ["npm", "run","build"]