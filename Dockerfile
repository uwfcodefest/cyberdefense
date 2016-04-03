FROM mhart/alpine-node

RUN mkdir /data
WORKDIR /app

# Need python to build bcrypt (node-gyp)
RUN apk add --no-cache \
    python \
    gcc \
    build-base

# Env vars
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production
ENV PORT 80
ENV DEBUG app:*,lib:*

# Install deps
COPY package.json package.json
RUN npm install

# Copy over app data
COPY server server
COPY public public
COPY assets assets
COPY common common
COPY config config
COPY .babelrc .babelrc
COPY server.js server.js

EXPOSE 80
CMD ["node", "server.js"]
