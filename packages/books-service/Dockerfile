# syntax=docker/dockerfile:1.4

FROM node:16-slim as pruned

# RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN npm i -g pnpm

WORKDIR /app

RUN pnpm config set store-dir /app/build/.pnpm-store

COPY pnpm-lock.yaml ./
# COPY pnpm-workspace.yaml ./

# WORKDIR /app/build
# RUN --mount=type=cache,id=pnpmstore,target=/app/build \
#   rm -rfv /app/build/packages/ && \
#   mv -v /app/pnpm-*.yaml /app/build && pnpm fetch --prod && ls -lah
RUN --mount=type=cache,id=pnpmstore,target=/app/build \
  pnpm config set store-dir /app/build/.pnpm-store && \
  pnpm fetch --prod

WORKDIR /app
COPY .npmrc .
COPY package.json .
COPY packages/books-service/package.json packages/books-service/package.json

# WORKDIR /app/build
# RUN --mount=type=cache,id=pnpmstore,target=/app/build \
#   cp -rfv /app/.npmrc /app/packages /app/build && \
#   rm -rfv /app/.npmrc /app/packages && \
#   rm -rf pruned && \
#   pnpm --filter books-service --prod deploy pruned && \
#   cp -r /app/build/pruned /app/pruned
RUN --mount=type=cache,id=pnpmstore,target=/app/build \
  pnpm config set store-dir /app/build/.pnpm-store && \
  pnpm --filter books-service --prod deploy pruned

# --------------------------------------------------------------------------------

FROM node:16-slim

ENV NODE_ENV=production

WORKDIR /app

# COPY build/pruned/books-service/node_modules node_modules
COPY --from=pruned /app/pruned .
COPY packages/books-service/dist dist
COPY packages/books-service/.env .
# COPY packages/books-service/package.json .

# CMD ["node", "dist/main"]
CMD ["npm", "run", "start:prod"]