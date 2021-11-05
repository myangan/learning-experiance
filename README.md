# PSQL and API excercise "House of Games

### link to hosted version: https://learning-experiance-games.herokuapp.com/api###

---

Project summery

_learning to building an API for the purpose of accessing application data programmatically using Test Driven Development(TDD). The intention here is to mimick the building of a real world backend service which should provide this information to the front end architecture._

---

### Instruction to set up

-We will need to create 2 .env files for the project .env.test (add PGDATABASE=nc_games_test) and .env.development (add PGDATABASE=nc_games).

link for cloneing project

```bash
link for git clone https://github.com/myangan/be-nc-games.git
```

we need to install belove dependencies and seed the database before testing

```bash
~ npm init -y
~ npm install jest -d
~ npm install pg
~ npm install dotenv
~ npm install express
~ npm install supertest
~ npm install jest-sorted
~ npm install pg-format
```

Check your script on your package.json

```bash
"script": {
    "setup-dbs": "psql -f ./db/setup.sql",
    "seed": "node ./db/seeds/run-seed.js",
    "test": "jest",
    "start": "node listen.js",
    "seed:prod": "NODE_ENV=production DATABASE_URL=$(heroku config:get DATABASE_URL) npm run seed"
  },
```

also we need jest on your package.json

```bash
"jest": {
    "setupFilesAfterEnv": [
      "jest-sorted"
    ]
  }
```

now we need to run and seed the DataBase for testing and development

```bash
- npm run setup-dbs
- npm run seeds
```

minimum versions of Node.js and Postgres

```bash
node version v16.6.1
PostgresSQL v14
```

## now should be ready to go
