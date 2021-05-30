## Start autoscaler

cd autoscaler && python3 main.py

## Launch pumba

docker run -it --rm -v /var/run/docker.sock:/var/run/docker.sock gaiaadm/pumba stress -d=60s restaurant-reservation_user_auth_api_1
