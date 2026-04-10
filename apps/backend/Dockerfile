FROM node:24 AS dev

WORKDIR /backend

COPY package*.json /.

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run build

CMD ["npm","run","start:dev"]