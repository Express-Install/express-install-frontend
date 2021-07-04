FROM node:alpine

RUN yarn global add serve

RUN mkdir -p /home/node/react-app

WORKDIR /home/node/react-app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile && yarn config set unsafe-perm true

COPY . .

EXPOSE 4000
