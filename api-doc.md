# Welcome to the Dhil-Commerce Server!

​
List of available endpoints:

- `POST /register`​
- `POST /login`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /carts`
- `POST /carts/:productId`
- `GET /carts/:id`
- `PUT /carts/:id/plus`
- `PUT /carts/:id/minus`
- `DELETE /carts/:id`
- `GET /wishlists`
- `POST /wishlists/:productId`
- `DELETE /wishlists/:id`


### POST /register

description: 
  register customer user

Request:

- data:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "id": "integer",
    "name": "string",
    "email": "string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "We found your email or password is not match with our data. Please try again"
  ]
}
```

### POST /login

description: 
  log in admin/customer user

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "We found your email or password is not match with our data. Please try again"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /products

description: 
  get all list products that admin user created. noted: everyone can read the list even they don't get access token in client-customer website

Request:

- headers: access_token (string) *optional

Response:

- status: 200
- body:

```json
[
  {
    "id": 74,
    "name": "Playstation 5",
    "image_url": "https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg",
    "category": "game console",
    "price": 8000000,
    "stock": 20,
    "createdAt": "2020-12-09T04:36:32.891Z",
    "updatedAt": "2020-12-09T04:36:32.891Z"
  },
  {
    "id": 75,
    "name": "Xbox Series x",
    "image_url": "https://www.techinn.com/f/13777/137776929/microsoft-xbox-series-x-1tb.jpg",
    "category": "game console",
    "price": 10000000,
    "stock": 30,
    "createdAt": "2020-12-09T04:36:32.925Z",
    "updatedAt": "2020-12-09T04:36:32.925Z"
  }
]

```

- status: 401
- body:

```json
{
  "message": "you must login first as admin"
}
```

- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /products

description: 
  Create list products that admin user made in form

Request:

- headers: access_token (string)
- body:

```json
{
    "name": "string",
    "image_url": "string",
    "category": "string",
    "price": "integer",
    "stock": "integer"
}
```

Response:

- status: 201
- body:

```json
{
    "id": 74,
    "name": "Playstation 5",
    "image_url": "https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg",
    "category": "game console",
    "price": 8000000,
    "stock": 20,
    "createdAt": "2020-12-09T04:36:32.891Z",
    "updatedAt": "2020-12-09T04:36:32.891Z"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first as admin"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "name musn't be empty",
    "image url musn't be empty",
    "category musn't be empty",
    "price musn't be empty",
    "stock musn't be empty"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /products/:id

description: 
  get product that admin user requested

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "id": 74,
    "name": "Playstation 5",
    "image_url": "https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg",
    "category": "game console",
    "price": 8000000,
    "stock": 20,
    "createdAt": "2020-12-09T04:36:32.891Z",
    "updatedAt": "2020-12-09T04:36:32.891Z"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first as admin"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### PUT /products/:id

description: 
  Update product that admin user edited

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
   "name": "string",
   "image_url": "string",
   "category": "string",
   "price": "integer",
   "stock": "integer"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 74,
    "name": "Playstation millenium",
    "image_url": "https://cdn-2.tstatic.net/jogja/foto/bank/images/playstation-5-ps5-dipasarkan-secara-online-saat-rilis-perdana.jpg",
    "category": "book",
    "price": 10000000,
    "stock": 20,
    "createdAt": "2020-12-09T04:36:32.891Z",
    "updatedAt": "2020-12-09T04:36:33.102Z"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first as admin"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### DELETE /products/:id

description: 
  Delete product 

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "your list's deleted"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first as admin"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```


-------------------------------------------------------------------------------

### GET /carts

description: 
  get all list products that customer picked.

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
  [
    {
      "id": 8,
      "UserId": 3,
      "ProductId": 1,
      "totalItem": 4,
      "totalPrice": 116000,
      "buyStatus": false,
      "createdAt": "2020-12-17T03:43:19.459Z",
      "updatedAt": "2020-12-17T07:45:12.570Z",
      "Product": {"Object"}
    }
  ],
  [
    {
      "totalCheckout": 116000
    }
  ]
]

```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```

- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /carts

description: 
  Create cart that customer picked after saw the products. There's two condition. First, if product hasn't picked before it will create as new cart. but if product has picked, it will update with totalItem get increment by 1

Request:

- headers: access_token (string)
- params: productId (integer)

Response:

(if product hasn't picked)
- status: 201
- body:

```json
{
      "id": 8,
      "UserId": 3,
      "ProductId": 1,
      "totalItem": 1,
      "totalPrice": 29000,
      "buyStatus": false,
      "createdAt": "2020-12-17T03:43:19.459Z",
      "updatedAt": "2020-12-17T03:43:19.459Z"
}
```

(if product has picked)
- status: 200
- body:

```json
{
      "id": 8,
      "UserId": 3,
      "ProductId": 1,
      "totalItem": 2,
      "totalPrice": 58000,
      "buyStatus": false,
      "createdAt": "2020-12-17T03:43:19.459Z",
      "updatedAt": "2020-12-17T07:49:12.570Z"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /carts/:id

description: 
  get cart that costumer requested

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
      "id": 8,
      "UserId": 3,
      "ProductId": 1,
      "totalItem": 4,
      "totalPrice": 116000,
      "buyStatus": false,
      "createdAt": "2020-12-17T03:43:19.459Z",
      "updatedAt": "2020-12-17T07:45:12.570Z"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### PUT /carts/:id/plus

description: 
  Update cart that customer added for item

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
      "id": 8,
      "UserId": 3,
      "ProductId": 1,
      "totalItem": 5,
      "totalPrice": 145000,
      "buyStatus": false,
      "createdAt": "2020-12-17T03:43:19.459Z",
      "updatedAt": "2020-12-17T07:55:12.570Z"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### PUT /carts/:id/minus

description: 
  Update cart that customer decreased for item

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
      "id": 8,
      "UserId": 3,
      "ProductId": 1,
      "totalItem": 4,
      "totalPrice": 116000,
      "buyStatus": false,
      "createdAt": "2020-12-17T03:43:19.459Z",
      "updatedAt": "2020-12-17T07:59:12.570Z"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### DELETE /carts/:id

description: 
  Delete cart 

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "your cart's deleted"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first as admin"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

-------------------------------------------------------------------------------

### GET /wishlists

description: 
  get all list wishlists that customer picked.

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
  {
      "id": 1,
      "UserId": 3,
      "ProductId": 1,
      "createdAt": "2020-12-17T03:23:19.459Z",
      "updatedAt": "2020-12-17T07:25:12.570Z",
      "Product": {"Object"}
  }
]

```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```

- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /wishlists

description: 
  Create wishlist that customer picked after saw the products.

Request:

- headers: access_token (string)
- params: productId (integer)

Response:

- status: 201
- body:

```json
{
      "id": 1,
      "UserId": 3,
      "ProductId": 1,
      "createdAt": "2020-12-17T03:23:19.459Z",
      "updatedAt": "2020-12-17T07:25:12.570Z",
      "Product": {"Object"}
}
```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```


### DELETE /wishlists/:id

description: 
  Delete wishlists

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "your wishlist's deleted"
}
```

- status: 401
- body:

```json
{
  "message": "you must login first as admin"
}
```
- status: 404
- body:

```json
{
  "message": "error not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```