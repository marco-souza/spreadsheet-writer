FROM node:lts-alpine AS setup

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock* ./

RUN pnpm i

COPY . .
