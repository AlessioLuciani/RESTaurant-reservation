# API REFERENCE

Contact this microservice from within the docker swarm by
calling

`
http://restaurant_data:3000/[query]
`

## Available query types:

POST search\
JSON body data: query: string\
JSON response: list of json containing restaurant data: name, address, menu, rating


POST test\
JSON body data: query: string\
JSON response: list of json containing restaurant test data: name, address, menu, rating

GET ping\
JSON response: string OR error: string

GET pingdb\
JSON response: json OR error: name, address, menu, rating


## Example ping

Request:

`
http://restaurant_data:3000/pingdb
`

Response: 
```
{
"Ok": 1.0
}
```

## Example test 

Request:
```
curl -X POST -H "Content-Type: application/json" \
    -d '{"query": "pizza"}' \
    http://localhost:12003/test
```

Response: 

```json
{
    "_id": "60a29e279063e7ef3379cbf5",
    "nome": "pizzeria margherita",
    "indirizzo": "via Napoli 2",
    "rating": "4",
    "menu": {
        "antipasti": {
            "prosciutto": "5.5€",
            "supplì": "1.5€"
        },
        "primi": {
            "pasta al sugo": "7€",
            "pizza": "9€"
        },
        "       Secondi": {
            "carne": "12€",
            "pesce": "15€"
        }
    }
}
```
