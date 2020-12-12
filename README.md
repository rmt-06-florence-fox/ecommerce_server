# E-Commerce Server

## URL
``` JS
Server: https://ecommerce-by-litha.herokuapp.com/
Client:
  - Admin: https://e-commerce-admin-by-litha.web.app/ 
```
#
## ROUTE
### POST /admin/login
- Request Body
```JS
email =  `user email`
password = `user password`
```
##### SUCCESS
- Response *`(200)`*
``` JS
{
    "id": 1,
    "email": "admin@mail.com",
    "access_token": "eyJhb..."
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *`(500)`*
```JS
{
  "message" : "Internal Server Error"
}
```
#
### POST /products
- Request Body
```JS
{
  name :  `product's name`,
  image_url :  `product's image url`,
  price : [integer],
  stock : [integer]
}
```
- Request Headers
```JS
access_token = `admin access token`
```
##### SUCCESS
- Response *`(201)`*
```JS
{
  "id": 1,
  "name": "Al-Qur'an",
  "image_url": "https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg",
  "price": 100000,
  "stock": 17,
  "updatedAt": "2020-12-07T15:31:21.697Z",
  "createdAt": "2020-12-07T15:31:21.697Z"
}
```
#
##### ERROR *`'Validation Error'`*
- Response *`(400)`*
```JS
{
  "messages": [
    {
      "message": "Name of product can't be empty"
    },
    {
      "message": "Image URL of product can't be empty"
    },
    {
      "message": "Price of product can't be empty"
    },
    {
      "message": "Price of product must be an integer "
    },
    {
      "message": "Stock of product can't be empty"
    },
    {
      "message": "Stock of product must be an integer "
    }
  ]
}
```
#
##### ERROR *`'Unauthorized'`*
- Response *`(401)`*
```JS
{
  "message": "You aren't admin !"
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *`(500)`*
```JS
{
  "message" : "Internal Server Error"
}
```
#
### GET /products
##### SUCCESS
- Response *`(200)`*
```JS
{
  "result": [
    {
      "id": 1,
      "name": "Al-Qur'an",
      "image_url": "https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg",
      "price": 100000,
      "stock": 17,
      "updatedAt": "2020-12-07T15:31:21.697Z",
      "createdAt": "2020-12-07T15:31:21.697Z"
    }
  ]
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *`(500)`*
```JS
{
  "message" : "Internal Server Error"
}
```
#
### GET /products/:id
- Request Body
```JS
{
  name :  `product's name`,
  image_url :  `product's image url`,
  price : [integer],
  stock : [integer]
}
```
- Request Params
```JS
id = [integer]
```
- Request Headers
```JS
access_token = `admin access token`
```
##### SUCCESS
- Response *`(200)`*
```JS
{
  "id": 1,
  "name": "Al-Qur'an",
  "image_url": "https://i.pinimg.com/564x/d1/d3/65/d1d36559c2ed91e701609a1aa96994b0.jpg",
  "price": 100000,
  "stock": 17,
  "updatedAt": "2020-12-07T15:31:21.697Z",
  "createdAt": "2020-12-07T15:31:21.697Z"
}
```
#
##### ERROR *`'Unauthorized'`*
- Response *`(401)`*
```JS
{
  "message": "You aren't admin !"
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *`(500)`*
```JS
{
  "message" : "Internal Server Error"
}
```
#
### PUT /products/:id
- Request Body
```JS
{
  name :  `product's name`,
  image_url :  `product's image url`,
  price : [integer],
  stock : [integer]
}
```
- Request Params
```JS
id = [integer]
```
- Request Headers
```JS
access_token = `admin access token`
```
##### SUCCESS
- Response *`(200)`*
```JS
{
  "id": 1,
  "name": "Tafsir Ibnu Katsir",
  "image_url": "https://i.pinimg.com/564x/90/fc/ae/90fcae1e4a06625e92153a02f469c240.jpg",
  "price": 1250000,
  "stock": 7,
  "createdAt": "2020-12-07T15:29:10.376Z",
  "updatedAt": "2020-12-07T15:31:11.883Z"
}
```
#
##### ERROR *`'Validation Error'`*
- Response *`(400)`*
```JS
{
  "messages": [
    {
      "message": "Name of product can't be empty"
    },
    {
      "message": "Image URL of product can't be empty"
    },
    {
      "message": "Price of product can't be empty"
    },
    {
      "message": "Price of product must be an integer "
    },
    {
      "message": "Stock of product can't be empty"
    },
    {
      "message": "Stock of product must be an integer "
    }
  ]
}
```
#
##### ERROR *`'Unauthorized'`*
- Response *`(401)`*
```JS
{
  "message": "You aren't admin !"
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *`(500)`*
```JS
{
  "message" : "Internal Server Error"
}
```
#
### DELETE /products/:id
- Request params
``` JS
id = [integer]
```
- Request Headers
```JS
access_token = `admin access token`
```
##### SUCCESS
- Response *`(200)`*
``` JS
{
  "message": "Successfully deleted data product !"
}
```
#
##### ERROR *`'Unauthorized'`*
- Response *`(401)`*
```JS
{
  "message": "You aren't admin !"
}
```
#
##### ERROR *`'Internal Server Error'`*
- Response *`(500)`*
```JS
{
  "message" : "Internal Server Error"
}
```
#