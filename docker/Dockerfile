ARG NODE_VERSION=16
ARG PHP_VERSION=8.1
ARG CONTAINER_REGISTRY=ghcr.io/syneido

FROM ${CONTAINER_REGISTRY}/build-php${PHP_VERSION}:latest AS php_builder
WORKDIR /app

RUN mkdir -p ssl; \
    openssl req -x509 -nodes -sha256 -days 3650 -newkey rsa:2048 \
        -keyout ssl/server.key \
        -out ssl/server.crt \
        -subj "/C=EN/L=London/O=Lunamy/OU=Production/CN=*.*"

FROM node:${NODE_VERSION}-alpine as builder
WORKDIR /app

# Write config in .env
RUN touch ./.env
ARG BASE_API_AUTH_URL
ARG BASE_API_CRM_URL
ARG APPLICATION_ID
ARG API_KEY

RUN echo "BASE_API_AUTH_URL=${BASE_API_AUTH_URL}" >> ./.env; \
    echo "BASE_API_CRM_URL=${BASE_API_CRM_URL}" >> ./.env; \
    echo "APPLICATION_ID=${APPLICATION_ID}" >> ./.env; \
    echo "API_KEY=${API_KEY}" >> ./.env; \
    cat ./.env

COPY --from=php_builder /app/ssl  /etc/ssl
COPY docker/health-check.js app.vue tailwind.config.js ./
COPY nuxt.config.js ./
COPY package.json ./
COPY assets assets/
COPY components components/
COPY composables composables/
COPY layouts layouts/
COPY middleware middleware/
COPY pages pages/
COPY plugins plugins/
COPY public public/
COPY store store/
COPY ssl ssl/
RUN mkdir -p dist

RUN set -eux; \
  npm install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN npm run build

ARG NODE_ENV
ENV NODE_ENV = ${NODE_ENV}

RUN set -eux; \
	if [ "${NODE_ENV}" = 'production' ]; then \
    NODE_ENV=production npm install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true; \
	fi

FROM node:${NODE_VERSION}-alpine as nodejs
WORKDIR /app
COPY --from=builder /app  .
COPY --from=php_builder /app/ssl  /etc/ssl
HEALTHCHECK --interval=5s --timeout=3s --retries=3 CMD ["node", "/app/health-check.js"]

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["node", "/app/.output/server/index.mjs"]
