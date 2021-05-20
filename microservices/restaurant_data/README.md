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

GET serach\
JSON body data: id: string\
JSON response: list of json containing restaurant data: name, address, menu, rating

POST test\
JSON body data: query: string\
JSON response: list of json containing restaurant test data: name, address, menu, rating

GET test\
JSON body data: id: string\
JSON response: list of json containing restaurant data: name, address, menu, rating

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

### search by query
Request:
```
curl -X POST -H "Content-Type: application/json" \
    -d '{"query": "risotto"}' \
    http://localhost:12003/test
```

Response: 

```json
{
        "_id": "<some id>,
        "nome": "ristorante buono",
        "indirizzo": "via Roma 1",
        "rating": "4",
        "menu": [
            {
                "category": "antipasti",
                "meals": [
                    {"item": "prosciutto", "price": "5.5\u20ac"},
                    {"item": "suppl\u00ec", "price": "1.5\u20ac"},
                ],
            },
            {
                "category": "Primi",
                "meals": [
                    {"item": "pasta al sugo", "price": "7\u20ac"},
                    {"item": "risotto", "price": "9\u20ac"},
                ],
            },
            {
                "category": "Secondi",
                "meals": [
                    {"item": "carne", "price": "12\u20ac"},
                    {"item": "pesce", "price": "15\u20ac"},
                ],
            },
        ],
    },
```

### search by id

Request:
```
curl -X GET -H "Content-Type: application/json" \
    -d '{"id": "<some id>"}' \
    http://localhost:12003/test
```

Response: 

```json
{       
        "_id": "<some id>,
        "nome": "ristorante buono",
        "indirizzo": "via Roma 1",
        "rating": "4",
        "menu": [
            {
                "category": "antipasti",
                "meals": [
                    {"item": "prosciutto", "price": "5.5\u20ac"},
                    {"item": "suppl\u00ec", "price": "1.5\u20ac"},
                ],
            },
            {
                "category": "Primi",
                "meals": [
                    {"item": "pasta al sugo", "price": "7\u20ac"},
                    {"item": "risotto", "price": "9\u20ac"},
                ],
            },
            {
                "category": "Secondi",
                "meals": [
                    {"item": "carne", "price": "12\u20ac"},
                    {"item": "pesce", "price": "15\u20ac"},
                ],
            },
        ],
    },
```
