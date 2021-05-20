.PHONY: all tsc

all:
		cd webapp && npm i && npm run build
		cd microservices/restaurant_auth && npm i
		cd microservices/user_auth && npm i
		make tsc
		docker-compose up --build

tsc:
		tsc -b microservices/user_auth
		tsc -b microservices/restaurant_auth
