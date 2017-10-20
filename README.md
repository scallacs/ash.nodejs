# Ash: Alexa SmartHome Backend Builder

[![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url]

Build a backend for Alexa Smarthome API with nodejs.

## Feature

## Developement

### Build

`npm run build`

### Test 

- `npm run test` - Tests
- `npm run cover` - Tests with coverage

## Commands

All commands in [package.json](./package.json)

* **npm run build** - run tsc
* **npm run build:watch** - run tsc in watch-mode
* **npm run clean** - delete *build* directory
* **npm run lint** - runs tslint
* **npm test** - run mocha on all *.ts files in *test/*
* **npm run node** - run ts-node to get a REPL or run a script, e.g. a spike: npm run node src/spikes/consolespike.ts
* **npm run test:watch** - re-run mocha on all *.ts files in *test/* everytime a file changes

## License

MIT © [Stéphane Léonard]()

[npm-url]: https://www.npmjs.org/package/@dfordev/ash.nodejs
[npm-image]: http://img.shields.io/npm/v/@dfordev/ash.nodejs.svg?style=flat-square

[travis-url]: http://travis-ci.org/scallacs/ash.nodejs
[travis-image]: http://img.shields.io/travis/scallacs/ash.nodejs.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/scallacs/ash.nodejs
[coveralls-image]: https://img.shields.io/coveralls/scallacs/ash.nodejs/master.svg?style=flat-square