# E-COMMERCE DOCUMENTATION

This app has :
- RESTful endpoint for CRUD operation
- JSON formatted response

## RESTful Endpoints 

`POST /products`
* Request Header
```
{
  "access_token": "<your access token>"
}
```
* Request Body
```
- name (string)
- price (integer)
- image_url (string)
- stock (integer)
- UserId (integer)
```
* Request Params
```
NONE
```
* Response (201)
```
{
    "id": 2,
    "name": "Facial Foam",
    "image_url": "<image_url>",
    "price": 45000,
    "stock": 2,
    "UserId": 1,
    "updatedAt": "2020-12-12T03:34:17.706Z",
    "createdAt": "2020-12-12T03:34:17.706Z"
}
```
* Response (401)
```
{
    message : "You are not authorize Edited the Product"
}
```
* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```

`GET /products`
* Request Header
```
{
  "access_token": "<your access token>"
}
```
* Request Body
```
NONE
```
* Request Params
```
NONE
```
* Response (200)
```
[
    {
        "id": 1,
        "name": "Masker",
        "image_url": "<image_url>",
        "price": 12000,
        "stock": 10,
        "createdAt": "2020-12-11T13:15:15.991Z",
        "updatedAt": "2020-12-12T00:34:16.243Z",
        "UserId": 2
    },
    {
        "id": 5,
        "name": "Facial Foam",
        "image_url": "<image_url>",
        "price": 45000,
        "stock": 2,
        "createdAt": "2020-12-12T03:34:17.706Z",
        "updatedAt": "2020-12-12T03:34:17.706Z",
        "UserId": 1
    }
]
```
* Response (500)
```
{
    "msg" : "Internal Server Error"
}
```

`PUT /products/:id`
* Request Header
```
{
  "access_token": "<your access token>"
}
```
* Request Body
```
- name (string)
- price (integer)
- image_url (string)
- stock (integer)
- UserId (integer)
```
* Request Params
```
- id 
```
* Response (200)
```
{
        "id": 5,
        "name": "Facial Foam",
        "image_url": "<image_url>",
        "price": 35000,
        "stock": 1,
        "createdAt": "2020-12-12T03:34:17.706Z",
        "updatedAt": "2020-12-12T03:34:17.706Z",
        "UserId": 1
    }
```
* Response (404)
```
{
    message : "Product Not Found on your list"
}
```
* Response (401)
```
{
    message : "You are not authorize Edited the Product"
}
```
* Response (500)
```
{
    "message" : "Internal Server Error"
}
```

`DELETE /products/:id`
* Request Header
```
{
  "access_token": "<your access token>"
}
```
* Request Body
```
NONE
```
* Request Params
```
- id 
```
* Response (200)
```
{
    message : `Product with id ${id} Success to delete`
}
```
* Response (404)
```
{
    "message" : "Product Not Found on your list"
}
```
* Response (401)
```
{
    message : "You are not authorize Edited the Product"
}
```
* Response (500)
```
{
    "message" : "Internal Server Error"
}
```

`POST /login`
* Request Header
```
NONE
```

* Request Body
```
- email (string/format E-mail)
- password (string)
```

* Request Params
```
NONE
```

* Response (200)
```
{
    "access_token": "<your access token>"
}
```
* Response (401)
```
{
    "message" : "Invalid Password"
}
```

* Response (500)
```
{
    "message" : "Internal Server Error"
}
```

## DEPLOY URL