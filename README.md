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
- `POST /loginCustomer`
- `POST /register`
- `GET /carts`
- `POST /carts/:id`
- `PATCH /carts/:id`
- `PUT /carts/:id`
- `DELETE /carts/:id`
- `GET /history`

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
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzc1NDI5MH0.H-vKQP-YmkWblt5VOnRhN8MDAfFF5n1oVqaJ8dffdkw"

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
none

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
Code: 500 Internal Server Error
Content: 
{
    "status": 500,
    "message": "Internal Server Error"
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
    "price": 1000000,2
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

===========================================================================

** Login Customer **
----
    Return json data about access_token

** URL **
----
`http://localhost:3000/register`

** Method: **
----
`POST`

** Header: **
----
none

** Required Data Body: **
----
{
    "email": "customer@mail.com",
    "password": "123456"
}


**  Success Response:  ** 
----
Code: 200
Content:
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwODA0ODQ0NX0.EuenJ-VLzXVl0yWpnkJbyo2Xd48xobd3FQBbWakEGmo"
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

** Register Customer **
----
    Return json data about id and email

** URL **
----
`http://localhost:3000/loginCustomer`

** Method: **
----
`POST`

** Header: **{
    "message": "Email already used"
}
----
none

** Required Data Body: **
----
{
    "email": "customer@mail.com",
    "password": "123456"
}


**  Success Response:  ** 
----
Code: 200
Content:
{
    "id": 3,
    "email": "customer@mail.com"
}

**  Error Response:  **
----
Code: 400 BAD REQUEST
Content:
{
    "message": "Email must not be empty"
}
OR
{
    "message": "Password must not be empty"
}
OR
{
    "message": "Email field input must be an email formatted"
}
OR
{
    "message": "Email already used"
}

===========================================================================

** GET Cart **
----
    Return json data about all Carts

** URL **
----
`http://localhost:3000/carts`

** Method: **
----
`GET`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwODA0ODQ5MX0.Onj_iCH2xHux7-rYwrajv54BQrREqpFGlbLtvm-s4V4"

** Required Data Body: **
----
none


**  Success Response:  ** 
----
Code: 200
Content:
[
    {
        "id": 5,
        "UserId": 3,
        "ProductId": 3,
        "quantity": 1,
        "price": 1000,
        "status": false,
        "createdAt": "2020-12-15T16:16:02.428Z",
        "updatedAt": "2020-12-15T16:16:02.428Z",
        "Product": {
            "id": 3,
            "name": "Peliharaan",
            "image_url": "https://i.imgur.com/vKEmjlK.png",
            "price": 1000,
            "stock": 1,
            "createdAt": "2020-12-15T12:08:05.479Z",
            "updatedAt": "2020-12-15T12:08:05.479Z"
        }
    },
    {
        "id": 6,
        "UserId": 3,
        "ProductId": 4,
        "quantity": 1,
        "price": 1250000,
        "status": false,
        "createdAt": "2020-12-15T16:17:08.621Z",
        "updatedAt": "2020-12-15T16:18:08.281Z",
        "Product": {
            "id": 4,
            "name": "Kambing",
            "image_url": "https://i.imgur.com/vKEmjlK.png",
            "price": 1250000,
            "stock": 1,
            "createdAt": "2020-12-15T16:16:52.197Z",
            "updatedAt": "2020-12-15T16:16:52.197Z"
        }
    }
]

** Error Response: **
----
Code: 500 Internal Server Error
Content: 
{
    "status": 500,
    "message": "Internal Server Error"
}

===========================================================================

** Add Carts **
----
    Write a new Cart to database

** URL **
----
`http://localhost:3000/carts/:id`

** Method: **
----
`POST`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwODA0ODQ5MX0.Onj_iCH2xHux7-rYwrajv54BQrREqpFGlbLtvm-s4V4"

** Required Data Body: **
----
{
    "quantity": "10",
}


**  Success Response:  ** 
----
Code: 200
Content:
{
    "message": "Product Kambing Has Been Successfully Added To Your Cart!"
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

** Patch Cart **
----
    Patch a Cart and then send it to the database

** URL **
----
`http://localhost:3000/carts/:id`

** Method: **
----
`PATCH`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwODA0ODQ5MX0.Onj_iCH2xHux7-rYwrajv54BQrREqpFGlbLtvm-s4V4"

** Required Data Body: **
----
none


**  Success Response:  ** 
----
Code: 200
Content:
{
    "message": "You Have Been Successfuly Bought Product Kambing"
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

===========================================================================

** Update Cart **
----
    Update a Cart and then send it to the database

** URL **
----
`http://localhost:3000/carts/:id`

** Method: **
----
`PUT`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwODA0ODQ5MX0.Onj_iCH2xHux7-rYwrajv54BQrREqpFGlbLtvm-s4V4"

** Required Data Body: **
----
{
    "quantity": "2",
}


**  Success Response:  ** 
----
Code: 200
Content:
{
    "message": "The Amount of Product Kambing Orders Has Been Successfully Increased!"
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

===========================================================================

** Delete Cart **
----
    Remove a cart data from the database

** URL **
----
`http://localhost:3000/carts/1`

** Method: **
----
`DELETE`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwODA0ODQ5MX0.Onj_iCH2xHux7-rYwrajv54BQrREqpFGlbLtvm-s4V4"

** Required Data Body: **
----
none


**  Success Response:  ** 
----
Code: 200
Content:
{
    "message": "Product Kambing Has Been Successfully Removed From Your Cart"
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

** GET History **
----
    Return json data about all history transaction

** URL **
----
`http://localhost:3000/history`

** Method: **
----
`GET`

** Header: **
----
`access_token`: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwODA0ODQ5MX0.Onj_iCH2xHux7-rYwrajv54BQrREqpFGlbLtvm-s4V4"

** Required Data Body: **
----
none


**  Success Response:  ** 
----
Code: 200
Content:
[
    {
        "id": 26,
        "UserId": 3,
        "ProductId": 2,
        "quantity": 2,
        "price": 200,
        "status": true,
        "createdAt": "2020-12-16T20:15:32.208Z",
        "updatedAt": "2020-12-16T20:30:28.288Z",
        "Product": {
            "id": 2,
            "name": "Pajar",
            "image_url": "https://i.imgur.com/vKEmjlK.png",
            "price": 100,
            "stock": 11,
            "createdAt": "2020-12-15T12:07:58.455Z",
            "updatedAt": "2020-12-15T12:07:58.455Z"
        }
    }
]

** Error Response: **
----
Code: 500 Internal Server Error
Content: 
{
    "status": 500,
    "message": "Internal Server Error"
}
