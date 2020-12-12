# Ecommerce CMS App Server

Ecommerce CMS is an application to manage your products in database and display it to client. This app has : 
* RESTful endpoint for products CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /login

> Create token for user

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