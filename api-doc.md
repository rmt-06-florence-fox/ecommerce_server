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

