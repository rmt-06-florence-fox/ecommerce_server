# ecommerce_server


```
weird admin cms

admin login
email : tio@mail.com
password : tiotio
```

## Restful endpoints
#
# URL
```
Client URL : http://localhost:3000/
Server URL : http://localhost:8080/
```

### GET/login
>login

_Request Header_
```
none
```
_Request Body_
```
email : tio@mail.com
password : tiotio
```
_Response(200)_
```
{
  access_token : "token string"
}
```
_Response(404)_
```
{
  message : 'email is not registered'
}
```
_Response(400)_
```
{
  access_token : "invalid"
}
```
_Response(400)_
```
{
  access_token : "field can not be empty"
}
```