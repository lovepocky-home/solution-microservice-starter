# syntax=docker/dockerfile:1.4

FROM node:16-slim as pruned

# RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN npm i -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm \
  --mount=type=cache,id=pnpm2,target=/.pnpm-store \
  pnpm fetch --prod

COPY .npmrc .
COPY packages/books-service/package.json packages/books-service/package.json

RUN pnpm --filter books-service --prod deploy pruned

# --------------------------------------------------------------------------------

FROM node:16-slim

ENV NODE_ENV=production

WORKDIR /app

COPY --from=pruned /app/pruned .
COPY packages/books-service/dist dist
COPY packages/books-service/.env .

CMD ["npm", "run", "start:prod"]