FROM node:24 AS dev

WORKDIR /frontend
COPY package*.json /.

RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "run","dev"]