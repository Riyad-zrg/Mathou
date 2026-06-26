# Socatoa

An application designed to help students improve their maths problems solving skills.

## Setup the global .env

Copy the `/apps/.env.example` in a `/apps/.env` and define the database credentials.

## Setup the frontend project

Copy the `/apps/frontend/.env.example` in a `/apps/frontend/.env` file and modify the variables.

The database URL needs to be modified based on the values you have referenced in `/apps/.env`

Example :

```
DATABASE_URL="postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:5432/{POSTGRES_DB}"
```

## Setup the backend project

Copy the `/apps/backend/.env.example` in a `/apps/backend/.env` file and modify the variables.

- The database URL needs to be modified based on the values you have referenced in `/apps/.env`

Example :

```
DATABASE_URL="postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:5432/{POSTGRES_DB}"
```

- Add a JWT secret to sign tokens.

- To send emails you need to specify a Resend API key.

## Install dependencies on frontend project

- Run the following command to install dependencies on the frontend project :

```
docker compose run --rm app-front npm i
```

## Initialize Prisma

Go in the /apps folder and run the command :

```
docker compose run --rm app-back npx prisma generate
```

This will create a temporary docker container to generate the prisma client.

Run database prisma migrations :

```
docker compose run --rm app-back npx prisma migrate reset
```

## Build and start containers

Go in the /apps folder and build the docker images :

```
make build
```

Start the containers :

```
make up
```

### Enter in the backend container

```
make bashb
```

To seed the database :

```
 npx prisma db seed
```

### Enter in the frontend container

```
make bashf
```
