# Ecommercce-CMS Documentation

Ecommerce-CMS is an application to manage your merchandise. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response


## RESTful endpoints
### POST /login

_Request Params_
```
Not needed
```
_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (200)_
```
{
  "access_token": "<your access token>"
}
```

_Response (401)_
```
{
  "msg": "Wrong Email/Password"
}
```

_Response (500 - Bad Request)_
```
{
  "msg": "Internal server error"
}
```
---
### GET /products

> Get all products

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<admin access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
  "id": <product id>,
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>"
  "UserId": "<id user admin>"
}
```
_Response (500 - Bad Request)_
```
{
  "msg": "Internal server error"
}
```
---
### GET /products/:id

> Get product with specific id

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<admin access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
  "id": <product id>,
  "name": "<product name>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>",
  "category": "<product category>"
  "UserId": "<id user admin>"
}
```
_Response (500 - Bad Request)_
```
{
  "msg": "Internal server error"
}
```
---
### POST /products

> Create new products

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<admin access token>"
}
```
_Request Body_
```
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>",
  "category": "<category to get insert into>"
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "image_url": "<posted image_url>",
  "price": "<posted price>",
  "stock": "<posted stock>",
  "category": "<posted category>",
  "UserId": "<posted status>"
}
```
_Response (400 - Bad Request)_
```
{
  "msg": "Name is required! Image url is required! Price is number only! Stock is number only! Category is required!"
}
```
_Response (500 - Bad Request)_
```
{
  "msg": "Internal server error"
}
```
---
### PUT /products/:id

> Update products with specific id

_Request Params_
```
Products's ID
```
_Request Header_
```
{
  "access_token": "<admin access token>"
}
```
_Request Body_
```
{
  "id": "<products id>",
  "name": "<products previous name>",
  "image_url": "<products previous image_url>"
  "price": "<products previous price>",
  "stock": "<products previous stock>",
  "category": "<products previous category>"
}
```
_Response (200)_
```
{
  "id": <products id>,
  "name": "<products updated name>",
  "image_url": "<products updated image_url>",
  "price": "<products updated price>",
  "stock": "<products updated stock>",
  "category": "<products updated category>",
  "UserId": "<User Id>"
}
```
_Response (400 - Bad Request)_
```
{
  "msg": "Name is required! Image url is required! Price is number only! Stock is number only! Category is required!"
}
```
_Response (500 - Bad Request)_
```
{
  "msg": "Internal server error"
}
```
_Response (404 - Not Found)_
```
{
  "msg": "Error not found!"
}
```
---
### DELETE /products/:id

> Delete products with specific id

_Request Params_
```
Products's ID
```
_Request Header_
```
{
  "access_token": "<admin access token>"
}
```
_Request Body_
```
Products's ID
```
_Response (200)_
```
{
  "Products Deleted Successfully"
}
```
_Response (500 - Bad Request)_
```
{
  "msg": "Internal server error"
}
```
_Response (404 - Not Found)_
```
{
  "msg": "Error not found!"
}
```
---