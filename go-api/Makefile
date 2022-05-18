DB_URL=postgresql://yugabyte:yugabyte@localhost:5433/yugabyte?sslmode=disable
MIGRATIONS_PATH=migrations

yugabyte-up:
	docker-compose up -d
yugabyte-down:
	docker-compose stop

# User
user-run:
	cd user && go run . 
user-watch:
	cd user && air	
user-tidy:
	cd user && go mod tidy && cd -
user-sqlc:
	cd user && sqlc generate

# Realtime
realtime-run:
	cd realtime && go run . 
realtime-watch:
	cd realtime && air	
realtime-tidy:
	cd realtime && go mod tidy && cd -

# feedback
feedback-watch:
	cd feedback && air	
feedback:
	go run feedback
feedback-tidy:
	cd feedback && go mod tidy && cd -

# frontendmentor
frontendmentor-watch:
	cd frontendmentor && air	
frontendmentor-run:
	cd frontendmentor && go run .
frontendmentor-tidy:
	cd frontendmentor && go mod tidy && cd -
frontendmentor-sqlc:
	cd upload && sqlc generate

# upload
upload-watch:
	cd upload && air	
upload-run:
	cd upload && go run .
upload-tidy:
	cd upload && go mod tidy && cd -
upload-sqlc:
	cd upload && sqlc generate

# Shared
shared-tidy:
	cd shared && go mod tidy && cd -
shared-mock-github:
	cd shared && mockgen -package mockgithub -destination github/mock/github.go shared/github Github

tidy: user-tidy feedback-tidy shared-tidy frontendmentor-tidy upload-tidy realtime-tidy

env:
	export $(grep -v '^#' .env | xargs)

migrateup:
	migrate -path "$(MIGRATIONS_PATH)" -database "$(DB_URL)" -verbose up
	sqlc-all

migratedrop:
	migrate -path "$(MIGRATIONS_PATH)" -database "$(DB_URL)" -verbose drop

migrateup1:
	migrate -path "$(MIGRATIONS_PATH)" -database "$(DB_URL)" -verbose up 1

migratedown:
	migrate -path "$(MIGRATIONS_PATH)" -database "$(DB_URL)" -verbose down

migratedown1:
	migrate -path $(MIGRATIONS_PATH) -database "$(DB_URL)" -verbose down 1

#Playground Run
playground-run:
	cd playground && go run .
#Playground Watch
playground-watch:
	cd playground && air

#Playground Tidy
playground-tidy:
	cd playground && go mod tidy

dbtest-up:
	docker run --name dbtest -p 5432:5432 \
	-e POSTGRES_DB=yugabyte \
	-e POSTGRES_USER=yugabyte \
	-v $(HOME)/tmp/dbtest:/var/lib/postgresql/data \
	-d postgres:14.2-alpine

dbtest-down:
	docker rm -f dbtest 

connect-dbtest:
	docker exec -it dbtest psql -U yugabyte -d yugabyte 

dbtest-reset: dbtest-down dbtest-up

sqlc-all:
	upload-sqlc feedback-sqlc user-sqlc realtime-sqlc frontendmentor-sqlc

.PHONY: start stop migrateup migratedown migrateup1 migratedown1 tidy shared-tidy dbtest-up dbtest-down dbtest-reset connect-dbtest sqlc-all upload-sqlc



