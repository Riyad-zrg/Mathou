# Socatoa

An application designed to help students improve their maths problems solving skills.

## Setup the frontend project 

Copy the ``/apps/frontend/.env.example`` in a ``/apps/frontend/.env`` file and modify the variables.

## Setup the backend project 

Copy the ``/apps/backend/.env.example`` in a ``/apps/backend/.env`` file and modify the variables.

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