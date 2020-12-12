# E-Commerce CMS Documentation

E-Commerce CMS is an application for sellers to manage products they sell on separated customer website. 
This app has : 
* RESTful endpoint for task's CRUD operation
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

_Response (200 - OK)_
```
{
  "access_token": "<your access token>",
  "fullName": "<your full name>"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Email or password is invalid."
}
```
---
### POST /products

> Create a new product

_Request Params_
```
Not needed
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "name": "<name to get insert into>",
  "CategoryId": "<CategoryId to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```
_Response (201 - Created)_
```
{
  "id": <product id>,
  "name": "<product name>",
  "CategoryId": "<product CategoryId>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>"
  "updatedAt": "2020-11-28T09:57:17.359Z",
  "createdAt": "2020-11-28T09:57:17.359Z",
}
```
_Response (400 - Bad Request)_
```
{
  "messages": [
        "name is required."
    ]
}
```
_Response (400 - Bad Request)_
```
{
  "messages": [
        "Name is required.",
        "Image url is required."
    ]
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
  "access_token": "<your access token>"
}
```
_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
[
  {
    "id": <product id>,
    "name": "<product name>",
    "CategoryId": "<product CategoryId>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>"
    "createdAt": "2020-11-25T00:09:34.514Z",
    "updatedAt": "2020-11-25T00:09:34.514Z"
  }
]
```
_Response (401 - Unauthorized)_
```
{
  "message": "Unauthorised Access!"
}
```
---
### GET /products/:id

> Get a product with specific id

_Request Params_
```
id=[integer]
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
[
  {
    " "id": <product id by request>,
    "name": "<product name>",
    "CategoryId": "<product CategoryId>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>"
    "updatedAt": "2020-11-28T09:57:17.359Z",
    "createdAt": "2020-11-28T09:57:17.359Z",
  }
]
```
_Response (401 - Unuthorized)_
```
{
   "message": "Unauthorized Access!"
}
```
_Response (404 - Not Found)_
```
{
   "message": "Data is not found."
}
```
---
### PUT /products/:id

> Update all properties of a product with specific id

_Request Params_
```
id=[integer]
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "name": "<product previous name>",
  "CategoryId": "<product previous CategoryId>",
  "image_url": "<product previous image_url>",
  "price": "<product previous price>",
  "stock": "<product previous stock>"
}
```
_Response (200 - OK)_
```
{
  "id": <product id>,
  "name": "<product updated name>",
  "CategoryId": "<product updated CategoryId>",
  "image_url": "<product udpated image_url>",
  "price": "<product updated price>",
  "stock": "<product updated stock>"
  "updatedAt": "2020-11-28T09:57:17.359Z",
  "createdAt": "2020-11-28T09:57:17.359Z",
}
```
_Response (400 - Bad Request)_
```
{
  "messages": [
        "Name is required."
    ]
}
```
_Response (400 - Bad Request)_
```
{
  "messages": [
        "Name is required.",
        "Image url is required."
    ]
}
```
_Response (401 - Unuthorized)_
```
{
   "message": "Unauthorized Access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data is not found."
}
```
---
### PATCH/products/:id

> Update a property of a product with specific id 

_Request Params_
```
id=[integer]
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "CategoryId": "<product previous CategoryId>"
}
```
_Response (200 - OK)_
```
{
  "id": <product id>,
  "name": "<product name>",
  "CategoryId": "<product updated CategoryId>",
  "image_url": "<product image_url>",
  "price": "<product price>",
  "stock": "<product stock>"
  "updatedAt": "2020-11-28T09:57:17.359Z",
  "createdAt": "2020-11-28T09:57:17.359Z",
}
```
_Response (401 - Unuthorized)_
```
{
   "message": "Unauthorized Access!"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data is not found."
}
```
---
### DELETE /products/:id

> Delete a product with specific id

_Request Params_
```
id=[integer]
```
_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
  "message": "The product has been successfully deleted."
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data is not found."
}
```
---