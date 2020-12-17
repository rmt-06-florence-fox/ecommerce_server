# ecommerce_server

## REST endpoints

URL

``` JS
http://localhost:3001/
```

---
### POST /login

> Create token for admin

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
### GET /product

> Get your list product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [
        {
            "id": 1,
            "title": "tes",
            "price": 100.000,
            "stock": 1,
            "createdAt": "2020-12-02T14:09:01.081Z",
            "updatedAt": "2020-12-02T14:09:01.081Z",
        }
    ]
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```
---
### POST /product

> post your product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  name :  `product's name`,
  image_url :  `product's image url`,
  price : [integer],
  stock : [integer]
}
```

_Response (200 - Success)_
```
{
    "data": {
                "id": 1,
                "title": "tes",
                "price": 100.000,
                "stock": 1,
                "createdAt": "2020-12-02T14:09:01.081Z",
                "updatedAt": "2020-12-02T14:09:01.081Z",
            }
}
```

_Response (500 - Internal server error)_
```
{
    "msg": "Internal server error"
}
```
---
### GET /product/:id

> get your product by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required:`id=[integer]`
```

_Response (200 - Success)_
```
{
    "data": {
                "id": 1,
                "title": "tes",
                "price": 100.000,
                "stock": 1,
                "createdAt": "2020-12-02T14:09:01.081Z",
                "updatedAt": "2020-12-02T14:09:01.081Z",
            }
}
```

_Response (404 - not found)_
```
{
    "message": "Data not found!"
}
```
---
### PUT /product/:id

> edit your product

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required:`id=[integer]`
{
  name :  `product's name`,
  image_url :  `product's image url`,
  price : [integer],
  stock : [integer]
}

```

_Response (200 - Success)_
```
{
    "id": 1,
    "title": "tes",
    "price": 100.000,
    "stock": 1,
    "createdAt": "2020-12-02T14:09:01.081Z",
    "updatedAt": "2020-12-02T14:09:01.081Z",
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### DELETE /product/:id

> delete your product 

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
required:`id=[integer]`

```

_Response (200 - Success)_
```
{
    "message": "product has been delete"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "you are not authorized to access this todo!"
}
```

---
### GET /cart

> fetch your cart 

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed

```

_Response (200 - Success)_
```
[
    {
        "id": 42,
        "AdminId": 3,
        "ProductId": 25,
        "status": true,
        "quantity": 1,
        "createdAt": "2020-12-17T09:12:19.808Z",
        "updatedAt": "2020-12-17T09:12:19.808Z",
        "Product": {
            "id": 25,
            "name": "axs",
            "image_url": "https://assets.pikiran-rakyat.com/crop/0x52:1920x1295/x/photo/2020/09/20/1711334745.jpg",
            "stock": 1,
            "price": 315351315,
            "createdAt": "2020-12-12T05:17:35.660Z",
            "updatedAt": "2020-12-12T05:17:35.660Z"
        }
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
### POST /cart/:ProductId

> add item to your cart 

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
require= ProductId[INTEGER]

```

_Response (201 - Success)_
```
{
    "id": 10,
    "AdminId": 3,
    "ProductId": 7,
    "status": true,
    "quantity": 1,
    "updatedAt": "2020-12-17T10:24:00.151Z",
    "createdAt": "2020-12-17T10:24:00.151Z"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### PATCH/cart/:CartId

> update quantity item on your cart 

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
require= CartId[INTEGER]

```

_Request Body_
```
require= quantity[INTEGER]

```

_Response (200 - Success)_
```
{
    "id": 10,
    "AdminId": 3,
    "ProductId": 7,
    "status": true,
    "quantity": 1,
    "updatedAt": "2020-12-17T10:24:00.151Z",
    "createdAt": "2020-12-17T10:24:00.151Z"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

---
### DELETE/cart/:ProductId

> delete item from your cart 

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
require= CartId[INTEGER]

```

_Response (200 - Success)_
```
{
    "message": "Success to delete!"
}
```

_Response (500 - Internal server error)_
```
{
    "message": "Internal server error"
}
```

