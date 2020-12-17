# E-Commerce CMS Apps - API Documentation by normnd.akbr
This E-Commerce CMS App is an application to manage items on an e-commerce online store. This app has :
* RESTful endpoint for login and register operation 
* RESTful endpoint for Create, Read, Update and Delete Products operation (only admin authorized for this actions)
* JSON formatted response

&nbsp;

## RESTful Login & Register Endpoints
### POST /register

> Register a new user

_Request Body_
```
{
    email: "admin@mail.com",
    password: "12345",
    role : ""
}
```
or
```
{
    email: "user@mail.com
    password: "qwerty"
    role: "user"
}
```

_Response (201)_
```
{
    message: "User successfully registered",
    {
        id: "1",
        email: "admin@mail.com",
        role: "admin"
    }
}
```
or
```
{
    message: "User successfully registered",
    {
        id: "1",
        email: "user@mail.com",
        role: "user"
    }
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```

### POST /login

> login to application

_Request Body_
```
{
    email: "admin@mail.com",
    password: "12345"
}
```

_Response (200)_
```
{
    message: "Welcome back admin@mail.com",
    {
        email: "admin@mail.com",
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
    }
}
```
_Response (404)_
```
{
    message: "Invalid Username/Password!"
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```
&nbsp;

## RESTful CRUD Endpoints
### GET /products

> Get all product item list on database

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Response (200)_
```
[
    {
        id: "1",
        name: "Earthree Gundam (HGBD:R)",
        image_url: "https://www.1999.co.jp/itbig63/10631811.jpg",
        scale: "HG"
        price: "275000",
        stock: "10",
        createdAt: "2020-11-28T18:25:43-05:00",
        updatedAt: "2020-11-28T18:25:43-05:00"
    },
    {
        id: "2",
        name: "Alus Earthree Gundam (HGBD:R)",
        image_url: "https://www.1999.co.jp/itbig66/10667783.jpg",
        scale: "HG"
        price: "230000",
        stock: "6",
        createdAt: "2020-11-28T18:25:43-05:00",
        updatedAt: "2020-11-28T18:25:43-05:00"
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

### GET /products/:id

> Get product details by its id

_Request Header_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Request Params_
```
{
    id: "2"
}
```

_Response (200)_
```
{
    id: "2",
    name: "Alus Earthree Gundam (HGBD:R)",
    image_url: "https://www.1999.co.jp/itbig66/10667783.jpg",
    scale: "HG"
    price: "230000",
    stock: "6",
    createdAt: "2020-11-28T18:25:43-05:00",
    updatedAt: "2020-11-28T18:25:43-05:00"
}
```

_Response (404)_
```
{
    message: "Not Found!"
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```

### POST /products

> Add new product

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Request Body_
```
{
        name: "Gundam 00 Sky Moebius (HGBD:R)",
        image_url: "https://www.1999.co.jp/itbig70/10707215.jpg",
        scale: "HG"
        price: "350000",
        stock: "2",
}
```

_Response (201)_
```
[
    {
        id: "3",
        name: "Gundam 00 Sky Moebius (HGBD:R)",
        image_url: "https://www.1999.co.jp/itbig70/10707215.jpg",
        scale: "HG"
        price: "350000",
        stock: "2",
        createdAt: "2020-11-28T18:25:43-05:00",
        updatedAt: "2020-11-28T18:25:43-05:00"
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

### PUT /products/:id

> Edit (update) selected Product item data

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Request Params_
```
{
    id: "3"
}
```

_Request Body_
```
{
    name: "Gundam 00 Sky Moebius (HGBD:R)",
    image_url: "https://www.1999.co.jp/itbig70/10707215.jpg",
    scale: "HG"
    price: "345000",
    stock: "15",
}
```

_Response (201)_
```
[
    {
        id: "3",
        name: "Gundam 00 Sky Moebius (HGBD:R)",
        image_url: "https://www.1999.co.jp/itbig70/10707215.jpg",
        scale: "HG"
        price: "345000",
        stock: "15",
        createdAt: "2020-11-28T18:25:43-05:00",
        updatedAt: "2020-11-28T18:25:43-05:00"
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

### DELETE /products/:id

> Remove selected product item

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Response (200)_
```
{
    message: "Deleted Successfully",
    true
}
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

## RESTful Client's Cart Endpoints
### GET /carts

> Get all Logged In client's cart on database

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Response (200)_
```
{
    "cart": {
        "id": 1,
        "UserId": 3,
        "status": "on-process",
        "createdAt": "2020-12-17T02:04:18.596Z",
        "updatedAt": "2020-12-17T02:04:18.596Z",
        "CartProducts": [
            {
                "id": 1,
                "CartId": 1,
                "ProductId": 3,
                "quantity": 2,
                "createdAt": "2020-12-17T02:19:56.426Z",
                "updatedAt": "2020-12-17T02:19:56.462Z",
                "Product": {
                    "id": 3,
                    "name": "Gundam 00 Sky Moebius (HGBD:R)",
                    "image_url": "https://www.1999.co.jp/itbig70/10707215.jpg",
                    "price": 315000,
                    "stock": 10,
                    "UserId": 1,
                    "createdAt": "2020-12-10T07:06:49.610Z",
                    "updatedAt": "2020-12-10T07:06:49.610Z"
                }
            },
            {
                "id": 2,
                "CartId": 1,
                "ProductId": 2,
                "quantity": 6,
                "createdAt": "2020-12-17T02:24:48.305Z",
                "updatedAt": "2020-12-17T02:25:34.026Z",
                "Product": {
                    "id": 2,
                    "name": "Alus Earthree Gundam (HGBD:R)",
                    "image_url": "https://www.1999.co.jp/itbig66/10667783.jpg",
                    "price": 257000,
                    "stock": 5,
                    "UserId": 1,
                    "createdAt": "2020-12-10T07:06:06.241Z",
                    "updatedAt": "2020-12-10T07:06:06.241Z"
                }
            }
        ]
    }
}
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

### POST /carts

> Add new product into user cart

_Request Header_
```
{ 
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Request Body_
```
{
    productId: 3
}
```

_Response (201)_
```
[
    {
        "CartId": 1,
        "CartProductId": 2
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

### PATCH /carts/:id

> update product quantity in cart

_Request Header_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Request Params_
```
{
    id: "3"
}
```

_Request Body_
```
{
    value: +1
}
```

_Response (200)_
```
[
    {
        "message": "Successfully update item quantity."
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```

### DELETE /carts/product/:id

> remove product in cart

_Request Header_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJpYXQiOjE2MDQyMTIzMzR9.tP1dBk7IY0AXtIYHrstuTnm1_o5Pu94Eam4oXK3tICo"
}
```

_Request Params_
```
{
    id: "3"
}
```

_Request Body_
```
{
    cartId: 1
}
```

_Response (200)_
```
[
    {
        "message": "Successfully deleted item from cart."
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error
}
```