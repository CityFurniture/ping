FROM node:16-alpine3.11

# Env
ARG PING_HOST=google.com
ARG PING_INTERVAL=5000
ARG NEWRELIC_LICENSE_KEY

ENV PING_HOST $PING_HOST
ENV PING_INTERVAL $PING_INTERVAL
ENV NEWRELIC_LICENSE_KEY $NEWRELIC_LICENSE_KEY

WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "package-lock.json", "./"]

RUN npm install
ADD . /usr/src/app
RUN npm run tsc
CMD ["npm", "start"]