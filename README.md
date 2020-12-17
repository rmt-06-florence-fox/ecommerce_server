# ecommerce_server

Server side of E-Commerce CMS App built with Express, Sequelize

### DEPLOY SITE: 

Client: 
https://ecomm-cms-sidsoeharto.web.app/

Server:
https://bukatoko-server.herokuapp.com/

#

## API DOCUMENTATION:

#

> ##  POST /register

_Request Body_
```json
{
  "email": "admin@mail.com",
  "password": "<your password>",
  "role": "User"
}
```

### Responses


_Response (201 - Created)_

```json
{
  "id": 2,
  "email": "user@mail.com",
  "password": "hashedPassword",
  "role": "User",
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
  "user": {
    "id": 2,
    "email": "user@mail.com"
  },
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
    "CategoryId": integer,
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
  "CategoryId": 1,
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

### Responses

_Response (200)_
```json
[
  {
      "id": 9,
      "name": "asdf",
      "image_url": "asdf",
      "price": "200000",
      "stock": 5,
      "CategoryId": 1,
      "createdAt": "2020-12-17T03:45:58.814Z",
      "updatedAt": "2020-12-17T03:45:58.814Z",
      "Category": {
          "id": 1,
          "name": "Mouse",
          "createdAt": "2020-12-16T08:09:13.000Z",
          "updatedAt": "2020-12-16T08:09:13.000Z"
      }
  },
]
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
  "CategoryId": integer,
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
  "CategoryId": 1,
  "price": 9999,
  "stock": 9999,
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

> ## GET /categories

### Responses

_Response (200)_
```json
[
    {
        "id": 1,
        "name": "Mouse",
        "createdAt": "2020-12-16T08:09:13.000Z",
        "updatedAt": "2020-12-16T08:09:13.000Z"
    },
    {
        "id": 2,
        "name": "Keyboard",
        "createdAt": "2020-12-16T08:09:13.000Z",
        "updatedAt": "2020-12-16T08:09:13.000Z"
    },
    {
        "id": 3,
        "name": "Mousepad",
        "createdAt": "2020-12-16T08:09:13.000Z",
        "updatedAt": "2020-12-16T08:09:13.000Z"
    },
    {
        "id": 4,
        "name": "Headset",
        "createdAt": "2020-12-16T08:09:13.000Z",
        "updatedAt": "2020-12-16T08:09:13.000Z"
    }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "Internal server error"
}
```

> ## POST /categories

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": string,
}
```

### Responses

_Response (201)_
```json
{
  "id": 1,
  "name": "<category name>",
}
```

_Response (400 - Bad Request)_
```json
{
  "error messages" || "Category already exist"
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

> ## PUT /categories/:id

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
}
```

### Responses

_Response (200)_
```json
{
  "name": "<category name>",
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
> ## DELETE /categories/:id

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
  "Successfully deleted category"
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

> ## GET /carts/:id

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
    "total": 12000000,
    "payload": {
        "id": 2,
        "email": "user@mail.com",
        "role": "User",
        "createdAt": "2020-12-07T08:49:11.603Z",
        "updatedAt": "2020-12-07T08:49:11.603Z",
        "Carts": [
            {
                "UserId": 2,
                "ProductId": 5,
                "quantity": 6,
                "createdAt": "2020-12-16T12:51:37.929Z",
                "updatedAt": "2020-12-16T12:58:51.000Z",
                "id": 1,
                "Product": {
                    "id": 5,
                    "name": "Razer Mamba",
                    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/12/11/575011487/575011487_10c9981c-83c8-4035-9809-4813b0d8f892.jpg",
                    "price": "2000000",
                    "stock": 6,
                    "CategoryId": 1,
                    "createdAt": "2020-12-10T05:51:14.902Z",
                    "updatedAt": "2020-12-10T05:51:14.902Z",
                    "Category": {
                        "id": 1,
                        "name": "Mouse",
                        "createdAt": "2020-12-16T08:09:13.000Z",
                        "updatedAt": "2020-12-16T08:09:13.000Z"
                    }
                }
            }
        ]
    }
}
```

_Response (500 - Internal Server Error)_
```json
{
  "Internal server error"
}
```

> ## POST /carts

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "UserId": 1,
  "ProductId": 1,
  "quantity": 1
}
```

### Responses

_Response (201)_
```json
{
  "id": 1,
  "UserId": 1,
  "ProductId": 1,
  "quantity": 1,
  "createdAt": "2020-12-16T12:51:37.929Z",
  "updatedAt": "2020-12-16T12:58:51.000Z",
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

> ## PATCH /carts/minus/:id

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id" : 4
}
```

### Responses

_Response (200)_
```json
{
    "UserId": 2,
    "ProductId": 3,
    "quantity": 2,
    "createdAt": "2020-12-17T02:03:08.439Z",
    "updatedAt": "2020-12-17T05:20:36.243Z",
    "Product": {
        "id": 3,
        "name": "BENQ Zowie EC2",
        "image_url": "https://static.bmdstatic.com/pk/product/medium/5d8044a747687.jpg",
        "price": "800000",
        "stock": 5,
        "CategoryId": 1,
        "createdAt": "2020-12-09T10:16:16.000Z",
        "updatedAt": "2020-12-09T10:16:16.000Z"
    }
}
```

_Response (404 - Not Found)_
```json
{
  "Error Not found"
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

> ## PATCH /carts/plus/:id

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id" : 4
}
```

### Responses

_Response (200)_
```json
{
    "UserId": 2,
    "ProductId": 3,
    "quantity": 3,
    "createdAt": "2020-12-17T02:03:08.439Z",
    "updatedAt": "2020-12-17T05:20:36.243Z",
    "Product": {
        "id": 3,
        "name": "BENQ Zowie EC2",
        "image_url": "https://static.bmdstatic.com/pk/product/medium/5d8044a747687.jpg",
        "price": "800000",
        "stock": 5,
        "CategoryId": 1,
        "createdAt": "2020-12-09T10:16:16.000Z",
        "updatedAt": "2020-12-09T10:16:16.000Z"
    }
}
```

_Response (404 - Not Found)_
```json
{
  "Error Not found"
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

> ## DELETE /carts/:id

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
  "Successfully deleted cart"
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

> ## GET /transactions/:id (All Transactions)

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id" : 2
}
```

### Responses

_Response (200)_
```json
[
    {
        "id": 1,
        "code": 112172020,
        "name": "Gareth",
        "email": "user@mail.com",
        "address": "Indonesia",
        "products": "Logitech G102 Prodigy 1 pcs, Razer Imperator 1 pcs",
        "total_price": 1300000,
        "createdAt": "2020-12-16T19:50:26.202Z",
        "updatedAt": "2020-12-16T19:50:26.202Z"
    }
]
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

> ## GET /transaction/:id (One Transaction)

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id" : 112172020
}
```

### Responses

_Response (200)_
```json
{
    "id": 1,
    "code": 112172020,
    "name": "Gareth",
    "email": "user@mail.com",
    "address": "Indonesia",
    "products": "Logitech G102 Prodigy 1 pcs, Razer Imperator 1 pcs",
    "total_price": 1300000,
    "createdAt": "2020-12-16T19:50:26.202Z",
    "updatedAt": "2020-12-16T19:50:26.202Z"
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

> ## POST /transaction/:id

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id" : 2
}
```

_Requests Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": string,
  "address": string,
  "products": string,
  "total_price": integer
}
```

### Responses

_Response (201)_
```json
{
    "codeTrans": 112172020
}
```

_Response (400 - Bad Request)_
```json
{
  "error messages"
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