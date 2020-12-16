# E-Commerce Server

## URL
``` JS
Server: https://ecommerce-by-litha.herokuapp.com/
Client:
  - Admin: https://e-commerce-admin-by-litha.web.app/
  - Customer: https://e-commerce-customer-by-litha.web.app/ 
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
### POST /customer/register
- Request Body
```JS
email =  `user email`
password = `user password`
```
##### SUCCESS
- Response *`(201)`*
``` JS
{
  "id": 12,
  "email": "user@mail.com"
}
```
#
##### ERROR *`'Validation Error'`*
- Response *`(400)`*
```JS
{
  "messages": [
    {
      "message": "Email can't be empty"
    },
    {
      "message": "Email must be formatted in example@mail.com"
    },
    {
      "message": "Password can't be empty"
    },
    {
      "message": "Password must be contain minimum 6 characters"
    }
  ]
}
```
#
##### ERROR *`'Sequelize Unique Constraint Error'`*
- Response *`(400)`*
```JS
{
  "message": "Email has been already exists"
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
### POST /customer/login
- Request Body
```JS
email =  `user email`
password = `user password`
```
##### SUCCESS
- Response *`(200)`*
``` JS
{
    "id": 12,
    "email": "user@mail.com",
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
>or
```JS
{
  "message": "Please Login First !"
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
>or
```JS
{
  "message": "Please Login First !"
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
>or
```JS
{
  "message": "Please Login First !"
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
>or
```JS
{
  "message": "Please Login First !"
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
### POST /carts/:productId
- Request params
```JS
productId = [integer]
```
- Request headers
```JS
access_token = 'customer access token'
```
- Request body
```JS
{
  quantity: [integer]
}
```
##### SUCCESS
- Response *`(201)`*
```JS
{
  "id": 125,
  "UserId": 12,
  "ProductId": 3,
  "updatedAt": "2020-12-16T14:15:51.686Z",
  "createdAt": "2020-12-16T14:15:51.686Z",
  "status": false,
  "quantity": 1
}
```
- Response *`(200)`*
```JS
{
  "id": 125,
  "UserId": 12,
  "ProductId": 3,
  "status": false,
  "quantity": 2,
  "createdAt": "2020-12-16T14:15:51.686Z",
  "updatedAt": "2020-12-16T14:19:07.629Z"
}
```
#
##### ERROR *`'Stock product not enough'`*
- Response *`(400)`*
```JS
{
  "message": "Stock product not enough"
}
```
#
##### ERROR *`'Unauthorized'`*
- Response *`(401)`*
```JS
{
  "message": "Please Login First !"
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
### GET /carts
- Request headers
```JS
access_token = 'customer access token'
```
##### SUCCESS
- Response *`(200)`*
```JS
{
  "totalPrice": 200000,
  "data": [
    {
      "id": 125,
      "UserId": 12,
      "ProductId": 3,
      "status": false,
      "quantity": 2,
      "createdAt": "2020-12-16T14:15:51.686Z",
      "updatedAt": "2020-12-16T14:19:07.629Z",
      "Product": {
        "id": 3,
        "name": "Al-Qur'an",
        "image_url": "https://i.pinimg.com/564x/e4/08/b1/e408b1b3dd4cba7f31e07ea3e6fd035b.jpg",
        "price": 100000,
        "stock": 3,
        "...
      }
    }
  ]
}
```
#
##### ERROR *`'Unauthorized'`*
- Response *`(401)`*
```JS
{
  "message": "Please Login First !"
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
### PATCH /carts/checkout
- Request headers
```JS
access_token = 'customer access token'
```
##### SUCCESS
- Response *`(200)`*
```JS
[
  {
    "id": 125,
    "UserId": 12,
    "ProductId": 3,
    "status": true,
    "quantity": 2,
    "createdAt": "2020-12-16T14:15:51.686Z",
    "updatedAt": "2020-12-16T14:23:26.883Z"
  }
]
```
#
##### ERROR *`'Unauthorized'`*
- Response *`(401)`*
```JS
{
  "message": "Please Login First !"
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
### GET /carts/histories
- Request headers
```JS
access_token = 'customer access token'
```
##### SUCCESS
- Response *`(200)`*
```JS
[
  {
    "id": 6,
    "UserId": 12,
    "ProductId": 7,
    "status": true,
    "quantity": 1,
    "createdAt": "2020-12-15T15:03:37.326Z",
    "updatedAt": "2020-12-16T12:24:22.120Z",
    "Product": {
      "id": 7,
      "name": "Talbis Iblis karya Ibnul Jauzi",
      "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/1/14/593445387/593445387_a41cfe01-e454-412b-ab73-acf98169152c_1080_1080.jpg",
      "price": 100000,
      "stock": 0,
        ...
    }
  },
  ...
]
```
#
##### ERROR *`'Unauthorized'`*
- Response *`(401)`*
```JS
{
  "message": "Please Login First !"
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
### DELETE /carts/:id
- Request params
```JS
id = [integer]
```
- Request headers
```JS
access_token = 'customer access token'
```
##### SUCCESS
- Response *`(200)`*
```JS
{
  "message": "Successfully deleted this cart !!!"
}
```
#
##### ERROR *`'Unauthorized'`*
- Response *`(401)`*
```JS
{
  "message": "You aren't authorized !"
}
```
> or
```JS
{
  "message": "Please Login First !"
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