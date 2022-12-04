FROM node:16-alpine
RUN apk update && apk add git
WORKDIR /frontend
COPY package.json /frontend/package.json
COPY yarn.lock /frontend/yarn.lock
COPY . .
RUN yarn
RUN yarn build