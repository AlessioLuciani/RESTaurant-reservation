## Build pumba

docker build -t pumba -f docker/Dockerfile .

## Launch pumba

docker run -it --rm  -v /var/run/docker.sock:/var/run/docker.sock gaiaadm/pumba --interval=60s --random --log-level=info stress  -d=30s