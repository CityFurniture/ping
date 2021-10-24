FROM node:16-alpine3.11

# Env
ARG PING_HOST=google.com
ARG PING_INTERVAL=5000

ENV PING_HOST $PING_HOST
ENV PING_INTERVAL $PING_INTERVAL

WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "package-lock.json", "./"]

RUN npm install
ADD . /usr/src/app
RUN npm run tsc
CMD ["npm", "start"]