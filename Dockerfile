#BASE IMAGE
FROM node:12.18.1

MAINTAINER wichan7@naver.com

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 80

CMD ["npm", "start"]