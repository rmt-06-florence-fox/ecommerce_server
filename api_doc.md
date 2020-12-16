# Ecommerce CMS App Server

Ecommerce CMS is an application to manage your products in database and display it to client. This app has : 
* RESTful endpoint for products CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /register

> Create user

_Request Header_
```
not needed data
```

_Request Body_
```
required : 
- email = [string]
- password = [string]

{
"email": "<email to get insert into>",
"password": "<password to get insert into>"
}
```

_Response (201 - Success)_
```
{
    "id": 24,
    "email": "ace@mail.com"
}
```

_Response (401 - Unauthorized)_
```
{
"message": "Invalid email/password"
}
```

---
### POST /login

> Create token only for customer

_Request Header_
```
not needed data
```

_Request Body_
```
required : 
- email = [string]
- password = [string]

{
"email": "<email to get insert into>",
"password": "<password to get insert into>"
}
```

_Response (200 - Success)_
```
{
"access_token": "<your access token>"
}
```

_Response (401 - Unauthorized)_
```
{
"message": "Invalid email/password"
}
```

---
### POST /admin/login

> Create token only for admin

_Request Header_
```
not needed data
```

_Request Body_
```
required : 
- email = [string]
- password = [string]

{
"email": "<email to get insert into>",
"password": "<password to get insert into>"
}
```

_Response (200 - Success)_
```
{
"access_token": "<your access token>"
}
```

_Response (401 - Unauthorized)_
```
{
"message": "Invalid email/password"
}
```

---
### POST /googleLogin

> Create token for user

_Request Header_
```
not needed data
```

_Request Body_
```
required : 
- gmail account
```

_Response (200 - Success)_
```
{
"access_token": "<your access token>"
}
```

_Response (500 - Internal server error)_
```
{
"message": "Internal server error"
}
```


---
### POST /products

> Create product data

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required : 
- name = [string]
- imageUrl = [string]
- price = [integer]
- stock = [integer]


{
  "name": "<name to get insert into>",
  "imageUrl": "<imageUrl to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": 2,
    "name": "raket badminton",
    "imageUrl": "https",
    "price": 400000,
    "stock": 30,
    "updatedAt": "2020-12-09T03:56:54.573Z",
    "createdAt": "2020-12-09T03:56:54.573Z"
}
```

_Response (400 - Bad request)_
```
{
    "message": "Name is required"
}
```

---
### GET /products

> Get all products 

_Request Header_
```
not needed data
```

_Request Body_
```
not needed data
```

_Response (200 - Success)_
```
[
    {
        "id": 2,
        "name": "raket badminton",
        "imageUrl": "https",
        "price": 400000,
        "stock": 30,
        "createdAt": "2020-12-09T03:56:54.573Z",
        "updatedAt": "2020-12-09T03:56:54.573Z"
    }
]
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```


---
### PUT /products/:id

> Update a product data

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required: 
- name = [string]
- imageUrl = [string]
- price = [integer]
- stock = [integer]


{
  "name": "<name to get insert into>",
  "imageUrl": "<imageUrl to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>"
}
```

_Response (200 - Success)_
```
{
    "message": "Data success updated"
}
```

_Response (400 - Bad request)_
```
{
    "message": "Name is required"
}
```
OR
_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### DELETE /products/:id

> Delete a product data

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required: 
- id = [integer]
```

_Response (200 - Success)_
```
{
    "message": "Data success deleted"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "You are not authorized"
}
```
OR

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### GET /banners

> Get all banners

_Request Header_
```
not needed data
```

_Request Body_
```
not needed data
```

_Response (200 - Success)_
```
[
    {
        "id": 4,
        "title": "Promo 1212",
        "status": "active",
        "imageUrl": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hair-salon-summer-promo-banner-design-template-528ff4abd3f1db406d83eab50d1f7994_screen.jpg?ts=1561539295",
        "createdAt": "2020-12-16T14:45:04.186Z",
        "updatedAt": "2020-12-16T14:45:04.186Z"
    },
    {
        "id": 5,
        "title": "Promo 1111",
        "status": "active",
        "imageUrl": "https://image.shutterstock.com/image-vector/brush-sale-banner-promotion-ribbon-260nw-1182942766.jpg",
        "createdAt": "2020-12-16T14:45:04.186Z",
        "updatedAt": "2020-12-16T14:45:04.186Z"
    },
    {
        "id": 6,
        "title": "Promo 1010",
        "status": "active",
        "imageUrl": "https://suneducationgroup.com/wp-content/uploads/2019/11/WEB-BANNER-YEAR-END-PROMO-SUN-ENGLISH-2019-Copy-1.jpg",
        "createdAt": "2020-12-16T14:45:04.186Z",
        "updatedAt": "2020-12-16T14:45:04.186Z"
    }
]
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### GET /carts

> Get all carts

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed data
```

_Response (200 - Success)_
```
[
    {
        "id": 54,
        "name": "Raket Badminton",
        "imageUrl": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/6/64426626/64426626_b1047753-c6c6-4023-9ab1-853e9e2d9efc_1200_1000.jpg",
        "price": 300000,
        "quantity": 5,
        "UserId": 22,
        "ProductId": 5,
        "createdAt": "2020-12-16T17:50:44.652Z",
        "updatedAt": "2020-12-16T17:50:50.868Z"
    },
    {
        "id": 55,
        "name": "Sepatu badminton",
        "imageUrl": "https://cf.shopee.co.id/file/139a7fb882fa562a3fc268a9c45c0465",
        "price": 300000,
        "quantity": 9,
        "UserId": 22,
        "ProductId": 9,
        "createdAt": "2020-12-16T17:51:01.039Z",
        "updatedAt": "2020-12-16T17:51:07.025Z"
    }
]
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### GET /carts/:ProductId

> Get cart by product id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
ProductId = [integer]
```

_Response (200 - Success)_
```
{
    "id": 54,
    "name": "Raket Badminton",
    "imageUrl": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/6/64426626/64426626_b1047753-c6c6-4023-9ab1-853e9e2d9efc_1200_1000.jpg",
    "price": 300000,
    "quantity": 5,
    "UserId": 22,
    "ProductId": 5,
    "createdAt": "2020-12-16T17:50:44.652Z",
    "u
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### POST /carts/:id

> Create/add cart

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required : 
- name = [string]
- imageUrl = [string]
- price = [integer]
- stock = [integer]
- quantity = [integer]
- ProductId = [integer]

{
  "name": "<name to get insert into>",
  "imageUrl": "<imageUrl to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>",
  "quantity": "<quantity to get insert into>",
  "ProductId": "<ProductId to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "msg": "Data added/updated to carts"
}
```

_Response (400 - Bad request)_
```
{
    "message": "Name is required"
}
```

---
### POST /carts/decrement

> Update quantity of cart with decrement

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required : 
- name = [string]
- imageUrl = [string]
- price = [integer]
- stock = [integer]
- quantity = [integer]
- ProductId = [integer]

{
  "name": "<name to get insert into>",
  "imageUrl": "<imageUrl to get insert into>",
  "price": "<price to get insert into>",
  "stock": "<stock to get insert into>",
  "quantity": "<quantity to get insert into>",
  "ProductId": "<ProductId to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "msg": "Data updated to carts"
}
```

_Response (400 - Bad request)_
```
{
    "message": "Name is required"
}
```

---
### DELETE /carts/:id

> Delete a cart data

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required: 
- id = [integer]
```

_Response (200 - Success)_
```
{
    "msg": "Data has been deleted"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### GET /history

> Get all history

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed data
```

_Response (200 - Success)_
```
[
    {
        "id": 23,
        "name": "Raket tenis",
        "imageUrl": "https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/2/101667485/101667485_a1757bdf-e303-4f02-83f1-8ab757518e69_688_688.jpg",
        "price": 1000000,
        "quantity": 3,
        "UserId": 22,
        "ProductId": 8,
        "createdAt": "2020-12-16T16:03:17.314Z",
        "updatedAt": "2020-12-16T16:03:17.314Z"
    },
    {
        "id": 24,
        "name": "Raket Badminton",
        "imageUrl": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/6/64426626/64426626_b1047753-c6c6-4023-9ab1-853e9e2d9efc_1200_1000.jpg",
        "price": 300000,
        "quantity": 4,
        "UserId": 22,
        "ProductId": 5,
        "createdAt": "2020-12-16T16:03:17.314Z",
        "updatedAt": "2020-12-16T16:03:17.314Z"
    },
    {
        "id": 25,
        "name": "Sepatu futsal",
        "imageUrl": "https://cf.shopee.co.id/file/5fb5f42d8709d6f483bf6b8d6485851f",
        "price": 500000,
        "quantity": 2,
        "UserId": 22,
        "ProductId": 10,
        "createdAt": "2020-12-16T16:03:17.314Z",
        "updatedAt": "2020-12-16T16:03:17.314Z"
    }
]
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### DELETE /history

> Delete history data

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
not needed data
```

_Response (200 - Success)_
```
{
    "msg": "Data has been deleted"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### POST /history

> Create history data

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required : 
- name = [string]
- imageUrl = [string]
- price = [integer]
- stock = [integer]
- quantity = [integer]
- ProductId = [integer]

{
  data: [
          {
          "name": "<name to get insert into>",
          "imageUrl": "<imageUrl to get insert into>",
          "price": "<price to get insert into>",
          "stock": "<stock to get insert into>",
          "quantity": "<quantity to get insert into>",
          "ProductId": "<ProductId to get insert into>"
          },
          ...
        ]
}
```

_Response (201 - Created)_
```
{
    "msg": "Data updated to carts"
}
```

_Response (400 - Bad request)_
```
{
    "message": "Name is required"
}
```

---
### GET /banners

> Get all banners

_Request Header_
```
not needed data
```

_Request Body_
```
not needed data
```

_Response (200 - Success)_
```
[
    {
        "id": 4,
        "title": "Promo 1212",
        "status": "active",
        "imageUrl": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hair-salon-summer-promo-banner-design-template-528ff4abd3f1db406d83eab50d1f7994_screen.jpg?ts=1561539295",
        "createdAt": "2020-12-16T14:45:04.186Z",
        "updatedAt": "2020-12-16T14:45:04.186Z"
    },
    {
        "id": 5,
        "title": "Promo 1111",
        "status": "active",
        "imageUrl": "https://image.shutterstock.com/image-vector/brush-sale-banner-promotion-ribbon-260nw-1182942766.jpg",
        "createdAt": "2020-12-16T14:45:04.186Z",
        "updatedAt": "2020-12-16T14:45:04.186Z"
    },
    {
        "id": 6,
        "title": "Promo 1010",
        "status": "active",
        "imageUrl": "https://suneducationgroup.com/wp-content/uploads/2019/11/WEB-BANNER-YEAR-END-PROMO-SUN-ENGLISH-2019-Copy-1.jpg",
        "createdAt": "2020-12-16T14:45:04.186Z",
        "updatedAt": "2020-12-16T14:45:04.186Z"
    }
]
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### POST /banners

> Update quantity of cart with decrement

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required : 
- title = [string]
- imageUrl = [string]
- status = [integer]

{
  "title": "<title to get insert into>",
  "imageUrl": "<imageUrl to get insert into>",
  "status": "<status to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "msg": "Success add banner"
}
```

_Response (400 - Bad request)_
```
{
    "message": "Name is required"
}
```

---
### PUT /banners/:id

> Update a product data

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required: 
- name = [string]
- imageUrl = [string]
- status = [integer]


{
  "name": "<name to get insert into>",
  "imageUrl": "<imageUrl to get insert into>",
  "status": "<status to get insert into>"
}
```

_Response (200 - Success)_
```
{
    "message": "Data success updated"
}
```

_Response (400 - Bad request)_
```
{
    "message": "Name is required"
}
```
OR
_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### DELETE /banners/:id

> Delete history data

_Request Header_
```
{
  "access_token": "<admin access token>"
}
```

_Request Body_
```
required: 
- id = [integer]
```

_Response (200 - Success)_
```
{
    "msg": "Data success deleted"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```