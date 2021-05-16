# you-rest
Another restaurant booking system

## Shared folder
https://drive.google.com/drive/folders/1ZcZuLC4pQyJVY_3o739JeKWlIBBQfBXg?usp=sharing

## Post request example
```
curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "John", "surname": "Doe", "email": "a@b.c", "password": "asd"}' \
    http://localhost:12001/register
```

## macOS Configuration

To allow metrics collection add these lines in the docker engine preferences:

```
{
  "metrics-addr" : "127.0.0.1:9323",
  "experimental" : true
}
```