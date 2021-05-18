# API REFERENCE

Contact this microservice from within the docker swarm by
calling

`
http://booking:3000/[query]
`

## Available query types:

POST reserve\
JSON body data: json
JSON response: json containing {reservation status, reservation_id} OR erorr: string

POST test\
JSON body data: json
JSON response:  json containing {reservation status, reservation_id}

GET ping\
JSON response: string OR error: string

GET pingdb\
JSON response: list OR error: list of available databases

## Example test 

Request:
```
curl -X POST -H "Content-Type: application/json" \
    -d '{"restaurantName": "ristorante buono","date": "22/03","service": "lunch","time": "13","seats": "3","notes": "","email": "a@a.t","status": "pending","authToken": "token"}' \
    http://localhost:12004/test
```

Response: 

if the token is valid

```json
{
 "body": "Reservation pending",
 "reservation_id": 'reservation_id',
}
```

else

`
User not authorized
`



