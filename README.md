# ecommerce_server

# USAGE
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon serve.js  to start the server.
Run `npm run serve` to start the client
```

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:4000
```

### GET/products

>get all task list

_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```

[
    {
        "id": 1,
        "name": "adidas superstar",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqe8PVZ6fDE4NhbHpdgMTQeT-SI2bQ7L2Tw&usqp=CAU",
        "price": 750000,
        "stock": 6,
        "createdAt": "2020-12-10T10:13:38.284Z",
        "updatedAt": "2020-12-12T00:19:06.647Z",
        "CategoryId": 1,
        "Category": {
            "id": 1,
            "name": "Sepatu",
            "createdAt": "2020-12-10T09:26:25.670Z",
            "updatedAt": "2020-12-10T09:26:25.670Z"
        }
    },
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```
_Response(403- forbidden)_
```
{
  "message": "You are not authorized"
}
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```

### POST/products

>Create new product

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>"
  "stock": "<stock to get insert into>"
  "categoryName": "<categoryName to get insert into>"
}
```
_Response (201 - Created)_
```
{
    "id": 9,
    "name": "sepatu lari",
    "image_url": "tes",
    "price": 1000000,
    "stock": 2,
    "CategoryId": 1,
    "updatedAt": "2020-12-12T08:29:30.525Z",
    "createdAt": "2020-12-12T08:29:30.525Z"
}
```
_Response(400- bad request)_
```
{
  "message": "Validation error: : Validation notEmpty on name failed, Validation notEmpty on image_url failed, Validation notEmpty on price failed, Validation notEmpty on stock failed, Validation price < 1000, validation stock < 0"
}
```
_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```
```
_Response(403- forbidden)_
```
{
  "message": "You are not authorized"
}
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
### GET/product/:id

>get product by id
_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
    "id": 9,
    "name": "sepatu lari",
    "image_url": "tes",
    "price": 1000000,
    "stock": 2,
    "CategoryId": 1,
    "updatedAt": "2020-12-12T08:29:30.525Z",
    "createdAt": "2020-12-12T08:29:30.525Z"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```
_Response(403- forbidden)_
```
{
  "message": "You are not authorized"
}
```
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
_Response(404 - not found)_
```
{
  "message": "error not found"
}
```

```
### PUT/product/:id

>Update product by ID

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>"
  "stock": "<stock to get insert into>"
  "categoryName": "<categoryName to get insert into>"
}
```
_Response (201 - Created)_
```
{
    "id": 9,
    "name": "sepatu lari",
    "image_url": "tes",
    "price": 900000,
    "stock": 2,
    "CategoryId": 1,
    "updatedAt": "2020-12-12T08:29:30.525Z",
    "createdAt": "2020-12-12T08:29:30.525Z"
}
```
_Response(400- bad request)_
```
{
  "message": "Validation error: : Validation notEmpty on name failed, Validation notEmpty on image_url failed, Validation notEmpty on price failed, Validation notEmpty on stock failed, Validation price < 1000, validation stock < 0"
}
```
_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```
```
_Response(403- forbidden)_
```
{
  "message": "You are not authorized"
}
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}

_Response(404 - not found)_
```
{
  "message": "error not found"
}
```
### PUT/task/:id

>Modify stock product by ID

_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
   "stock": "<stock to get updated later on>"
}
```
_Response(200)_
```
{
    "id": 9,
    "name": "sepatu lari",
    "image_url": "tes",
    "price": 1000000,
    "stock": 3,
    "CategoryId": 1,
    "updatedAt": "2020-12-12T08:29:30.525Z",
    "createdAt": "2020-12-12T08:29:30.525Z"
}
_Response(400- bad request)_
```
{
  "message": "Validation error: : Validation notEmpty on stock failed, validation stock < 0"
}
```
_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```
```
_Response(403- forbidden)_
```
{
  "message": "You are not authorized"
}
_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}

_Response(404 - not found)_
```
{
  "message": "error not found"
}
```

```
### DELETE/product/:id

>Delete product by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  "message": "delete success"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "you are not authorized"
}
```

_Response(404 - not found)_
```
{
  "message": "error not found"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

### POST/login

>Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200)_
```
{
    "access_token": <token>
}
```
_Response(400- bad request)_
```
{
    "message": "Invalid Account, invalid email or password"
}
```


_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

### POST/banner

>Create new banner

__Request Header_
```
{
  access_token: <token>
}
```
_Request Body_
```
{
  "title": "<name to get insert into>",
  "image_url: "<url to get insert>",
  "status": : "<status to get insert>
}
```
_Response (201 - Created)_
```
{
    "id": 4,
    "title": "diskon 12 12",
    "image_url": "tes",
    "status": "true",
    "updatedAt": "2020-12-12T08:38:28.305Z",
    "createdAt": "2020-12-12T08:38:28.305Z"
}
```
_Response(400- bad request)_
```
{
  "message": "Validation error: : Validation notEmpty on title failed"
}
```
```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "you are not authorized"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
### GET/banner

>GET banner

__Request Header_
```
{
  access_token: <token>
}
```
_Request Body_
```
_Response (200)_
```
[
    {
        "id": 4,
        "title": "diskon 12 12",
        "status": "true",
        "image_url": "tes",
        "createdAt": "2020-12-12T08:38:28.305Z",
        "updatedAt": "2020-12-12T08:38:28.305Z"
    },

```

_Response(401- Unauthorized)_
```
{
  "message": "You must login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "you are not authorized"
}
```
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```

### POST/category

>Create new category

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  "name": "<name to get insert into>",
}
```
_Response (201 - Created)_
```
    {
        "id": 1,
        "name": "sepatu",
        "createdAt": "2020-11-30T10:15:44.126Z",
        "updatedAt": "2020-11-30T10:15:44.126Z"
    }
```
_Response(400- bad request)_
```
{
  "message": "Validation error: : Validation notEmpty on name failed"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
### GET/category

>GET category

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
_Response (200)_
```
[
    {
        "id": 2,
        "name": "Baju Pria",
        "createdAt": "2020-12-11T15:28:26.088Z",
        "updatedAt": "2020-12-11T15:28:26.088Z",
        "Products": []
    },

```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```

### POST/cart

>Create new cart

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  "ProductId": "<ProductId to get insert into>",
}
```
_Response (201 - Created)_
```
    {
        "id": 1,
        "UserId": "1",
        "ProductId": "1",
        "quantity": 1,
        "createdAt": "2020-11-30T10:15:44.126Z",
        "updatedAt": "2020-11-30T10:15:44.126Z"
    }
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
### GET/cart

>GET cart

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
_Response (200)_
```
    {
        "id": 1,
        "UserId": "1",
        "ProductId": "1",
        "quantity": 1,
        "createdAt": "2020-11-30T10:15:44.126Z",
        "updatedAt": "2020-11-30T10:15:44.126Z"
    }

```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
### PATCH/cart

>upadete cart
__Request Header_
```
{
  access_token: token,
  headers: CartId
}
```
_Request Body_
```
{
  "quantity": "<quantity to get insert into>",
}
_Response (200)_
```
    {
        "id": 1,
        "UserId": "1",
        "ProductId": "1",
        "quantity": 2,
        "createdAt": "2020-11-30T10:15:44.126Z",
        "updatedAt": "2020-11-30T10:15:44.126Z"
    }

```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
### DELETE/cart

>GET cart

__Request Header_
```
{
  access_token: token,
  params: cartId
}
```
_Request Body_
```
_Response (200)_
```
{'delete success}

```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
