.PHONY: all tsc clean

all:
		cd webapp && npm i && npm run build --fix
		cd microservices/restaurant_auth && npm i
		cd microservices/user_auth && npm i
		make tsc
		docker-compose up --build

tsc:
		tsc -b microservices/user_auth
		tsc -b microservices/restaurant_auth

clean:
		find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;
