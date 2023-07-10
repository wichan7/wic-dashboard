FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install -g pm2

RUN npm install

EXPOSE 3310

CMD ["npm", "start"]