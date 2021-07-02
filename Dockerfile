FROM node:alpine

RUN mkdir -p /home/node/react-app
#&& chown -Rh node:node /home/node/node-app

WORKDIR /home/node/react-app

COPY package.json yarn.lock ./

#USER node

RUN yarn install --pure-lockfile && yarn config set unsafe-perm true

COPY . .
#--chown=node:node

EXPOSE 4000
