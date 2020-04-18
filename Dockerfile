FROM node:10.15.0-alpine
EXPOSE 3000

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm i

COPY . /app

RUN npm run build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && . /app/src/scripts/start.sh

# CMD . /app/src/scripts/start.sh
