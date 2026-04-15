# Socatoa

An application designed to help students improve their maths problems solving skills.

## Setup the global .env

Copy the ``/apps/.env.example`` in a ``/apps/.env`` and define the database credentials.

## Setup the frontend project 

Copy the ``/apps/frontend/.env.example`` in a ``/apps/frontend/.env`` file and modify the variables.

The database URL needs to be modified based on the values you have referenced in ``/apps/.env``

Example :

```
DATABASE_URL="postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:5432/{POSTGRES_DB}"
```

## Setup the backend project 

Copy the ``/apps/backend/.env.example`` in a ``/apps/backend/.env`` file and modify the variables.

The database URL needs to be modified based on the values you have referenced in ``/apps/.env``

Example :

```
DATABASE_URL="postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:5432/{POSTGRES_DB}"
```

## Initialize Prisma

Go in the /apps folder and run the command :

```
docker compose run --rm app-back npx prisma generate
```

This will create a temporary docker container to generate the prisma client

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