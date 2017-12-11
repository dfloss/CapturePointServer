FROM node:carbon

ENV SERVERPORT=8080

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE $SERVERPORT
CMD ["npm","start"]
