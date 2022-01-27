FROM node:12.16.1

WORKDIR /app

COPY /src/                ./src/
COPY /nest-cli.json       ./nest-cli.json
COPY /ormconfig.js        ./ormconfig.js
COPY /package.json        ./package.json
COPY /tsconfig.build.json ./tsconfig.build.json
COPY /tsconfig.json       ./tsconfig.json
COPY /tslint.json         ./tslint.json
COPY /yarn.lock           ./yarn.lock

RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["yarn", "start:prod"]
