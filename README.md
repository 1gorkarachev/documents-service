## Description

Document Service

## Running the app

```bash

# copy env
$ cp .env.example .env

# app start
$ docker-compose up -d

# run migrations
$ docker-compose exec document-service npm run migration:run
```
