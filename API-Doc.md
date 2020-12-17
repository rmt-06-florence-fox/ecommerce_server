# Ecommercce-Server Documentation

Ecommerce-Server is an application to manage your merchandise. This app has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

# URL Local
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000

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
  "password": "<your password>",
  "role": "<admin ecommerce>"
}
```
### _Success Response_
  _Response (200)_
  ```
  {
    "access_token": "<your access token>"
  }
  ```
### _Errors Response_
  _Response (401)_
  ```
  {
    "msg": "Wrong Email/Password"
  }
  ```
  _Response (500)_
  ```
  {
    "msg": "Internal server error"
  }
  ```
---
### POST /loginCustomer

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
### _Success Response_
  _Response (200)_
  ```
  {
    "access_token": "<your access token>"
  }
  ```
### _Errors Response_
  _Response (401)_
  ```
  {
    "msg": "Wrong Email/Password"
  }
  ```
  _Response (500)_
  ```
  {
    "msg": "Internal server error"
  }
  ```
---
### POST /registerCustomer
> Create new user

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
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```
### _Success Response_
  _Response (201)_
  ```
  {
    "id": <given id by system>,
    "email": "<posted email>"
  }
  ```
### _Errors Response_
  _Response (500)_
  ```
  {
    "msg": "Internal server error"
  }
  ```
  _Response (400)_
  ```
  {
    "msg": "Password is required!, Password must be more than 6 character"
  }
  ```
  _Response (400)_
  ```
  {
    "msg": "Email is required!, Email must be a format sample@mail.com"
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
### GET /carts

> Get all product in carts

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<customer access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
    "id": 1,
    "quantity": 1,
    "checkout": "false",
    "ProductId": 1,
    "UserId": 3,
    "Product": {
        "id": 1,
        "name": "X-Box Series X",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/51A41nLe5IL._AC_SX522_.jpg",
        "price": "9000000",
        "stock": "12",
        "category": "Electronic",
        "UserId": 1
    }
}
```
_Response (500 - Bad Request)_
```
{
  "msg": "Internal server error"
}
```
---
### POST /carts

> Create new carts

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<customer access token>"
}
```
_Request Body_
```
{
  "ProductId": "<Product id>"
}
```
_Response (201 - Created)_
```
{
    "id": 3,
    "quantity": 2,
    "checkout": "false",
    "ProductId": 3,
    "UserId": 2
}
```
_Response (400 - Bad Request)_
```
{
  "msg": "Out Of Products!"
}
```
_Response (500 - Bad Request)_
```
{
  "msg": "Internal server error"
}
```
---
### GET /carts/:id

> Get cart with specific id

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<customer access token>"
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
  "id": 1,
  "quantity": 1,
  "checkout": "false",
  "ProductId": 1,
  "UserId": 3,
  "Product": {
      "id": 1,
      "name": "X-Box Series X",
      "image_url": "https://images-na.ssl-images-amazon.com/images/I/51A41nLe5IL._AC_SX522_.jpg",
      "price": "9000000",
      "stock": "12",
      "category": "Electronic",
      "UserId": 1
  }
}
```
_Response (500 - Bad Request)_
```
{
  "msg": "Internal server error"
}
```
---
### DELETE /carts/:id

> Delete cart with specific id

_Request Params_
```
Products's ID
```
_Request Header_
```
{
  "access_token": "<customer access token>"
}
```
_Request Body_
```
Products's ID
```
_Response (200)_
```
{
  "Product on your cart deleted successfully!"
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
### PUT /carts/:id

> Update cart with specific id

_Request Params_
```
Products's ID
```
_Request Header_
```
{
  "access_token": "<cusomer access token>"
}
```
_Request Body_
```
{
  "quantity": "<stock product>"
}
```
_Response (200)_
```
{
  "id": 3,
  "quantity": 2,
  "checkout": "false",
  "ProductId": 3,
  "UserId": 2
}
```
_Response (400 - Bad Request)_
```
{
  "msg": "Out Of Products!"
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