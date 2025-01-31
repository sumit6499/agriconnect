# stage 1: testing all checks are passed or not
FROM node:23-alpine3.20 AS tester

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml  ./

COPY prisma prisma

RUN pnpm install

COPY . .

RUN pnpm test

# stage2: building next.js
FROM node:23-alpine3.20 AS builder

WORKDIR /app

COPY --from=tester /app/node_modules node_modules
COPY . .

RUN npm run build

# stage3: running next.js app only with .next folder
FROM node:23-alpine3.20 AS release

WORKDIR /agriconnect

RUN npm install -g pnpm

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public /public
COPY --from=builder /app/package.json  package.json
COPY --from=builder /app/pnpm-lock.yaml pnpm-lock.yaml
COPY --from=builder /app/prisma /prisma

RUN pnpm install --production

EXPOSE 3000

ENTRYPOINT [ "pnpm","start" ]

