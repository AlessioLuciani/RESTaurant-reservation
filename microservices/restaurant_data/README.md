# API REFERENCE

Contact this microservice from within the docker swarm by
calling

`
http://restaurant_data:3000/[query]
`

## Available query types:

POST search\
JSON body data: name: string\
JSON response: restaurant data: name, address, menu, rating

GET ping\
JSON response: string OR error: string

GET pingdb\
JSON response: json OR error: name, address, menu, rating


## Example call

Request:

`
http://restaurant_data:3000/pingdb
`

Data:

```json
{"nome":"test_data", 
"indirizzo": "via Roma 1",
"rating": 4,
"menu": {
    "anitpasti": {
        "sample": "prezzo€"
    },
    "primi": {
        "sample": "prezzo€"
    },
    "secondi": {
        "sample": "prezzo€"
    }
}
```
