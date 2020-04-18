FROM node:10.15.0-alpine
EXPOSE 3000

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm i

COPY . /app

RUN npm run build

CMD . /app/src/scripts/start.sh
