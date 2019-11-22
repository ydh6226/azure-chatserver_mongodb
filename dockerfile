FROM node:latest
WORKDIR /usr/src/app

copy . .

RUN npm install

EXPOSE 3000
CMD node app.js

