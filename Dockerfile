FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run check && npm run build

FROM caddy:2-alpine
WORKDIR /app
COPY Caddyfile ./Caddyfile
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
