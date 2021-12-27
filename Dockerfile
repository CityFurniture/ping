FROM node:16-alpine3.11

# Env
ENV PING_HOST "example.com"
ENV PING_INTERVAL 5000
ENV NEW_RELIC_ACCOUNT_ID ""
ENV NEW_RELIC_API_KEY ""

WORKDIR /usr/src/app
COPY ["package.json", "npm-shrinkwrap.json*", "package-lock.json", "./"]

RUN npm install
ADD . /usr/src/app
RUN npm run tsc
CMD ["npm", "start"]