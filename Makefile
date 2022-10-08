CONTAINER := auth-service

deploy:
	make build
	make start
	make generate-certificates

build:
	docker-compose build

start:
	docker-compose up -d
	make install
	make restart

watch:
	docker-compose up

stop:
	docker-compose down --remove-orphans

restart:
	docker-compose restart ${CONTAINER}

ssh:
	docker exec -it ${CONTAINER} /bin/bash

install:
	docker exec ${CONTAINER} bash -c "npm install $(package) $(mode)"
	make update-node_modules

uninstall:
	docker exec ${CONTAINER} bash -c "npm uninstall $(package)"
	make update-node_modules

migration:
	docker exec ${CONTAINER} bash -c "npx mikro-orm migration:create --blank"

migration-diff:
	docker exec ${CONTAINER} bash -c "npx mikro-orm migration:create"

migrate:
	docker exec ${CONTAINER} bash -c "npx mikro-orm migration:up"

reset-db:
	docker exec ${CONTAINER} bash -c "npx mikro-orm migration:fresh"

update-node_modules:
	sudo docker cp ${CONTAINER}:/app/node_modules ./
	sudo chmod 777 -R node_modules

generate-certificates:
	docker exec ${CONTAINER} bash -c "openssl genrsa -out certificates/private.pem 4096"
	docker exec ${CONTAINER} bash -c "openssl rsa -in certificates/private.pem -pubout -out certificates/public.pem"