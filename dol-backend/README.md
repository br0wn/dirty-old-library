Izvini sto ovdje pisem, ali mozes li mi reci razlog ne odgovaranja na poruke i pozive? Jesi li se ikada barem zapitao kako placam racune u ovom periodu ?

## Description

This project was bootstrapped with [NestJS](https://nestjs.com/) A
progressive <a href="http://nodejs.org" target="blank">Node.js</a>
framework for building efficient and scalable server-side applications.

## Install Packages

```bash
yarn install
```

## SMTP Server

Setup a SMTP server of your choice, like Sendgrid.

## PostgreSQL

Setting up database for development:

```postgresql
--- create user
CREATE USER countme_cloud WITH LOGIN;
ALTER ROLE countme_cloud with password 'password';

--- create database
CREATE DATABASE countme_cloud WITH OWNER countme_cloud;

--- use the new database:
\c countme_cloud;
--- enable uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## Environment

Base environment variables are set in `.env` file. This file is committed to repository and should **NOT** be changed
locally.

Overriding values of environment variables **MUST** be done in `.env.local` file!

If necessary, set database user, pw, database, etc in corresponding `TYPEORM_` vars. For development
set `TYPEORM_SYNCHRONIZE=true`, it will do database synchronisation with the model on app startup.

Set `AUTH_UPDATE_PASSWORD_URL` to `<frontend_base_url>/auth/update-password/:token`. This is the URL that will be put to
password reset email. Default is `http://localhost:3000/auth/update-password/:token`.

Set `AUTH_CONFIRM_EMAIL_URL` to `<frontend_base_url>/auth/confirm-email/:token`. This is the URL that will be put to
password reset email. Default is `http://localhost:3000/auth/confirm-email/:token`.

## ORM

[TypeORM](https://typeorm.io/#/) is used as ORM tool.

Configuration file [`ormconfig.js`](./ormconfig.js).

TypeORM CLI tool can be used as follows:

```bash
yarn run typeorm <command> [params, ...]
```

More info about CLI tool can be found in [TypeORM CLI docs](https://typeorm.io/#/using-cli).

## Fixtures

To load fixtures execute:

```bash
yarn run fixtures:load
```

To load production fixtures execute:

```bash
yarn run fixtures:load:prod
```

## Running the app

If `TYPEORM_SYNCHRONIZE` wasn't set to true, database sync must be done manually:

```bash
yarn run typeorm schema:sync
```

To run the app execute one of the following:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e:prepare     // prepare db for tests
$ yarn run test:e2e             // run tests

# test coverage
$ yarn run test:cov
```

## CLI

See available CLI commands:

```bash
$ yarn run cli -h
```

For yarn run scripts check `"scripts"` part of [package.json](./package.json) or run:

```bash
$ yarn run
```
