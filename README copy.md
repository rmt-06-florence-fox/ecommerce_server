# ecommerce_server

Server side of E-Commerce CMS App built with Express, Sequelize

### DEPLOY SITE: 
* to be released

#

## API DOCUMENTATION:

#

> ##  POST /register

_Request Body_
```json
{
  "email": "admin@mail.com",
  "password": "<your password>",
  "role": "Admin" || "User"
}
```

### Responses


_Response (201 - Created)_

```json
{
  "id": 1,
  "email": "admin@mail.com",
  "password": "hashedPassword",
  "role": "Admin",
  "createdAt": "2020-12-08T10:09:35.368Z",
  "updatedAt": "2020-12-08T10:09:35.368Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "error messages"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "Internal Server Error"
}
```

> ## POST /login

_Requests Body_
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

### Responses


_Response (200)_
```json
{
  "access_token": "<your access token>"
}
```

_Response (400 - Bad Request)_
```json
{
  "error messages"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "Internal Server Error"
}
```

> ## POST /products

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Requests Body_
```json
{
    "name": string,
    "image_url": string,
    "price": greater than 0 integer,
    "stock": greater than 0 integer
}
```

### Responses


_Response (201 - Created)_
```json
{
  "id": 1,
  "name": "<product name>",
  "image_url": "<image url>",
  "price": 9999,
  "stock": 9999,
  "updatedAt": "2020-12-08T10:09:35.368Z",
  "createdAt": "2020-12-08T10:09:35.368Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "error messages"
}
```

_Response (403 - Forbidden)_
```json
{
  "You have to login first"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "Internal server error"
}
```

> ## GET /products

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

### Responses

_Response (200)_
```json
[
  {
    "id": 1,
    "name": "<product name>",
    "image_url": "<image url>",
    "price": 9999,
    "stock": 9999,
    "updatedAt": "2020-12-08T10:09:35.368Z",
    "createdAt": "2020-12-08T10:09:35.368Z"
  },
  {
    "id": 2,
    "name": "<product name>",
    "image_url": "<image url>",
    "price": 9999,
    "stock": 9999,
    "updatedAt": "2020-12-08T10:09:35.368Z",
    "createdAt": "2020-12-08T10:09:35.368Z"
  },
  {
    "id": 3,
    "name": "<product name>",
    "image_url": "<image url>",
    "price": 9999,
    "stock": 9999,
    "updatedAt": "2020-12-08T10:09:35.368Z",
    "createdAt": "2020-12-08T10:09:35.368Z"
  }
]
```

_Response (403 - Forbidden)_
```json
{
  "You Have to login first"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "Internal server error"
}
```

> ## PUT /products/:id

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id" : 1
}
```

_Request Body_
```json
{
  "name": string,
  "image_url": string,
  "price": greater than 0 integer,
  "stock": greater than 0 integer
}
```

### Responses

_Response (200)_
```json
{
  "id": 1,
  "name": "<product name>",
  "image_url": "<image url>",
  "price": 9999,
  "stock": 9999,
  "updatedAt": "2020-12-08T10:09:35.368Z",
  "createdAt": "2020-12-08T10:09:35.368Z"
}
```

_Response (404 - Not Found)_
```json
{
  "Error Not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "error messages"
}
```

_Response (403 - Forbidden)_
```json
{
  "User not Authenticated"
}
```

_Response (401 - Unauthorized)_
```json
{
  "You have to login first"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "Internal Server Error"
}
```

> ## DELETE /products/:id

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id" : 1
}
```

### Responses

_Response (200)_
```json
{
  "Successfully deleted product"
}
```

_Response (404 - Not Found)_
```json
{
  "Error not found"
}
```

_Response (403 - Forbidden)_
```json
{
  "User not Authenticated"
}
```

_Response (401 - Unauthorized)_
```json
{
  "You have to login first"
}
```


_Response (500 - Internal Server Error)_
```json
{
  "Internal Server Error"
}
```
