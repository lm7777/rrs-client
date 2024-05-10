ARG NODE_VERSION=18.13.0

FROM node:${NODE_VERSION}-alpine as build

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .

RUN npm run build

FROM node:${NODE_VERSION}-alpine as runtime

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist /usr/src/app

CMD node rrs/server/server.mjs

EXPOSE 4000
