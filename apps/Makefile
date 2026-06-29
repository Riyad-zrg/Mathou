.PHONY: up down build bashf bashb

up:
	docker compose -f compose.yaml -f compose.dev.yaml up -d

prod:
	docker compose up -d

down:
	docker compose down -v

restart:
	make down
	make up

build:
	docker compose build --pull

bashf:
	docker compose run app-front bash

bashb:
	docker compose run app-back bash

