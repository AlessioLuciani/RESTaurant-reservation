# API REFERENCE

Contact this microservice from within the docker swarm by
calling

`
http://booking:3000/[query]

Contact this microservice from outside the docker swarm by
calling

`
http://localhost:12004/[query]
`
`

## Available query types:

POST reserve\
JSON body data: json containing {"rest_email", "date", "service", "time", "seats", "notes", "email", "status", "authToken"}\
JSON response: json containing {"Reservation pending","reservation_id"} OR error: string

POST my_reservations\
JSON body data: json containing {"authToken","email","user_type"}\
JSON response:  json containing list of reservations OR error: string

PATCH change_status\
JSON body data: json containing {"res_id","status","authToken","email"}\
JSON response:  json containing {"Status updated"} OR error: string

GET pingdb\
JSON response: list OR error: list of available databases

GET ping\
JSON response: string OR error: "connection established"

## Example test 

Request:
```
curl -X POST -H "Content-Type: application/json" \
    -d '{"restaurantName": "ristorante buono","date": "22/03","service": "lunch","time": "13","seats": "3","notes": "","email": "a@a.t","status": "pending","authToken": "token"}' \
    http://localhost:12004/my_reservations
```

Response: 

if the token is valid

```json
{
 "body": "Reservation pending",
 "reservation_id": reservation_id,
}
```

else

`
User not authorized
`



