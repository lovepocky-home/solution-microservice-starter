FROM nginx:alpine

WORKDIR /app

COPY deploy/nginx.conf /etc/nginx/nginx.conf

COPY dist/books-ui /app

# mount config.js to /app/assets/config/config.js
