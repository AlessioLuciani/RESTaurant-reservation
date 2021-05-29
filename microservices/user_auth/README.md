# API REFERENCE

Contact this microservice from within the docker swarm by
calling

`
http://user_auth_api:3000/[query]
`

## Available query types:

```
POST register
JSON body data: name: string, surname: string, email: string, password: string
JSON response: token: string OR error: string

POST login
JSON body data: email: string, password: string OR token: string
JSON response: token: string OR error: string

POST logout
JSON body data: email: string, token: nullable string
JSON response: empty OR error: string

GET validate
JSON body data: email: string, token: string
JSON response: token: string OR error: string
```

## Example call

Request:

`
http://user_auth_api:3000/validate
`

Data:

```json
{"email":"a@b.c", "token":"abcdef"}
```
