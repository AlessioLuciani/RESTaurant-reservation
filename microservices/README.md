## Post request example

```
curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "John", "surname": "Doe", "email": "a@b.c", "password": "asd"}' \
    http://localhost:12001/register
```