# Builds a Docker to deliver dist/
# FROM centos:7
FROM node:7.10.1

WORKDIR /guins/client

ADD . /guins/client

ENV API_URL http://exaka.com:3001
# ENV API_URL http://docker.for.mac.localhost:3001

RUN npm i
RUN npm rebuild node-sass
#RUN npm rebuild node-sass --force
#RUN npm run build:aot
RUN npm run build:prod

EXPOSE 8080


CMD ["npm", "run", "server:prod"]
