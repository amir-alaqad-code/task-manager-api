.PHONY: build up down logs test lint

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down -v

logs:
	docker compose logs -f api

test:
	npm test

lint:
	npm run lint
