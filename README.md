# ecommerce_server
Ecommerce CMS apps.

** RESTful Endpoints **
----
- `POST /login`
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

** Login User **
----
    Return json data about access_token

** URL **
----
`http://localhost:3000/login`

** Method: **
----
`POST`

** Header: **
----
none

** Required Data Body: **
----
{
    "email": "admin@mail.com",
    "password": "123456"
}


**  Success Response:  ** 
----
Code: 200
Content:
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzc1NDI5MH0.H-vKQP-YmkWblt5VOnRhN8MDAfFF5n1oVqaJ8dffdkw"
}

** Error Response: **
----
Code: 400 BAD REQUEST
Content: 
{
    "status": 400,
    "message": "Please Fill Email And Password Fields"
}
OR
{
    "status": 400,
    "message": "Invalid Account"
}
OR
{
    "status": 400,
    "message": "Wrong Password"
}

===========================================================================

** Add Product **
----
    Write a new Product to database

** URL **
----
`http://localhost:3000/products`

** Method: **
----
`POST`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzc1NDI5MH0.H-vKQP-YmkWblt5VOnRhN8MDAfFF5n1oVqaJ8dffdkw

** Required Data Body: **
----
{
    "name": "hape",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/4662663/4662663_be9198a2-9e49-4553-9bbd-2c586cd9c769_700_700.jpg",
    "price": 1000000,
    "stock": 10
}


**  Success Response:  ** 
----
Code: 200
Content:
{
    "id": 1,
    "name": "hape",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/4662663/4662663_be9198a2-9e49-4553-9bbd-2c586cd9c769_700_700.jpg",
    "price": 1000000,
    "stock": 10,
    "updatedAt": "2020-12-12T06:35:31.077Z",
    "createdAt": "2020-12-12T06:35:31.077Z"
}

** Error Response: **
----
Code: 401 UNAUTHORIZED
Content: 
{
    "status": 401,
    "message": "Please Login First"
}
OR
{
    "status": 401,
    "message": "You Are Not Authorized"
}

OR

Code: 400 BAD REQUEST
Content:
{
    "message": "All fields must not be empty"
}
OR
{
    "message": "The price field value must not less than 0"
}
OR
{
    "message": "The stock field value must not less than 0"
}
OR
{
    "message": "Name must be a string value, image_url must be a string value, price must be a number value and stock must be a number value"
}


===========================================================================

** GET Product **
----
    Return json data about all Products

** URL **
----
`http://localhost:3000/products`

** Method: **
----
`GET`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzc1NDI5MH0.H-vKQP-YmkWblt5VOnRhN8MDAfFF5n1oVqaJ8dffdkw"

** Required Data Body: **
----
none


**  Success Response:  ** 
----
Code: 200
Content:
[
    {
        "id": 1,
        "name": "hape",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/4662663/4662663_be9198a2-9e49-4553-9bbd-2c586cd9c769_700_700.jpg",
        "price": 1000000,
        "stock": 5,
        "createdAt": "2020-12-12T06:35:31.077Z",
        "updatedAt": "2020-12-12T06:53:08.084Z"
    },
    {
        "id": 2,
        "name": "ngakak",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/4662663/4662663_be9198a2-9e49-4553-9bbd-2c586cd9c769_700_700.jpg",
        "price": 1000000,
        "stock": 12,
        "createdAt": "2020-12-12T07:01:16.465Z",
        "updatedAt": "2020-12-12T07:01:16.465Z"
    },
    {
        "id": 3,
        "name": "ngukiuk",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/4662663/4662663_be9198a2-9e49-4553-9bbd-2c586cd9c769_700_700.jpg",
        "price": 1000000,
        "stock": 12,
        "createdAt": "2020-12-12T07:01:22.559Z",
        "updatedAt": "2020-12-12T07:01:22.559Z"
    },
    {
        "id": 5,
        "name": "Mie ayam",
        "image_url": "https://assets-pergikuliner.com/M40cezuQdzN7Xq2W39WS-RTy4v4=/fit-in/1366x768/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/1852927/picture-1582102068.jpg",
        "price": 12000,
        "stock": 200,
        "createdAt": "2020-12-12T10:45:30.521Z",
        "updatedAt": "2020-12-12T10:45:30.521Z"
    }
]

** Error Response: **
----
Code: 401 UNAUTHORIZED
Content: 
{
    "status": 401,
    "message": "Please Login First"
}

===========================================================================

** GET Product By Id**
----
    Return json data about a Product

** URL **
----
`http://localhost:3000/products/:id`

** Method: **
----
`GET`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzc1NDI5MH0.H-vKQP-YmkWblt5VOnRhN8MDAfFF5n1oVqaJ8dffdkw"

** Required Data Body: **
----
none


**  Success Response:  ** 
----
Code: 200
Content:
{
    "id": 1,
    "name": "hape",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/4662663/4662663_be9198a2-9e49-4553-9bbd-2c586cd9c769_700_700.jpg",
    "price": 1000000,
    "stock": 5,
    "createdAt": "2020-12-12T06:35:31.077Z",
    "updatedAt": "2020-12-12T06:53:08.084Z"
}

** Error Response: **
----
Code: 401 UNAUTHORIZED
Content: 
{
    "status": 401,
    "message": "Please Login First"
}

===========================================================================

** Update Product **
----
    Update a Product and then send it to the database

** URL **
----
`http://localhost:3000/products/1`

** Method: **
----
`PUT`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzc1NDI5MH0.H-vKQP-YmkWblt5VOnRhN8MDAfFF5n1oVqaJ8dffdkw"

** Required Data Body: **
----
{
    "name": "hape",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/4662663/4662663_be9198a2-9e49-4553-9bbd-2c586cd9c769_700_700.jpg",
    "price": 1000000,
    "stock": 5
}


**  Success Response:  ** 
----
Code: 200
Content:
{
    "id": 1,
    "name": "hape",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/4662663/4662663_be9198a2-9e49-4553-9bbd-2c586cd9c769_700_700.jpg",
    "price": 1000000,
    "stock": 5,
    "createdAt": "2020-12-12T06:35:31.077Z",
    "updatedAt": "2020-12-12T06:53:08.084Z"
}

** Error Response: **
----
Code: 401 UNAUTHORIZED
Content: 
{
    "status": 401,
    "message": "Please Login First"
}
OR
{
    "status": 401,
    "message": "You Are Not Authorized"
}

OR

Code: 400 BAD REQUEST
Content:
{
    "message": "All fields must not be empty"
}
OR
{
    "message": "The price field value must not less than 0"
}
OR
{
    "message": "The stock field value must not less than 0"
}
OR
{
    "message": "Name must be a string value, image_url must be a string value, price must be a number value and stock must be a number value"
}

===========================================================================

** Delete product **
----
    Remove a product data from the database

** URL **
----
`http://localhost:3000/products/1`

** Method: **
----
`DELETE`

** Header: **
----
`access token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzc1NDI5MH0.H-vKQP-YmkWblt5VOnRhN8MDAfFF5n1oVqaJ8dffdkw"

** Required Data Body: **
----
none


**  Success Response:  ** 
----
Code: 200
Content:
{
    "message": "Deleted Successfully"
}

** Error Response: **
----
Code: 401 UNAUTHORIZED
Content: 
{
    "status": 401,
    "message": "Please Login First"
}
