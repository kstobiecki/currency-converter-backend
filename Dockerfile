FROM node:15.11.0-alpine3.13 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:15.11.0-alpine3.13 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}