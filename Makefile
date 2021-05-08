.PHONY: all tsc

all:
		make tsc
		docker compose up --build

tsc:
		tsc -b microservices/user_auth
