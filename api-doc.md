# Welcome to the Dhil-Commerce CMS!

​
List of available endpoints:
​
- `POST /login`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`



### POST /login

description: 
  log in as admin

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
    "access_token": "string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "Invalid email/password"
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
  fetch list of products

Request:

- headers: access_token: 'string'

Response:

- status: 200
- body:

```json
{
  "id": 1,
  "name": "Sample",
  "image_url": "https://sample_url.jpg",
  "price": 1000,
  "stock": 10,
  "UserId": 1,
  "createdAt": "2020-12-17T04:36:32.891Z",
  "updatedAt": "2020-12-17T04:36:32.891Z"
}

```

- status: 401
- body:

```json
{
  "message": "Please log in as admin"
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
  add product

Request:

- headers: access_token: 'string'
- body:

```json
{
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer"
}
```

Response:

- status: 200
- body:

```json
{
  "id": 1,
  "name": "Sample",
  "image_url": "https://sample_url.jpg",
  "price": 1000,
  "stock": 10,
  "UserId": 1,
  "createdAt": "2020-12-17T04:36:32.891Z",
  "updatedAt": "2020-12-17T04:36:32.891Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please log in as admin"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "Please fill the name",
    "Please add a picture",
    "Please add a price",
    "Please input stock"
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
  fetch product by id

Request:

- headers: access_token: 'string'
- params: id: 'integer'

Response:

- status: 200
- body:

```json
{
  "id": 1,
  "name": "Sample",
  "image_url": "https://sample_url.jpg",
  "price": 1000,
  "stock": 10,
  "UserId": 1,
  "createdAt": "2020-12-17T04:36:32.891Z",
  "updatedAt": "2020-12-17T04:36:32.891Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please log in as admin"
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
  update product

Request:

- headers: access_token: 'string'
- params: id: 'integer'
- body:

```json
{
   "name": "string",
   "image_url": "string",
   "price": "integer",
   "stock": "integer"
}
```

Response:

- status: 200
- body:

```json
{
  "id": 1,
  "name": "Sample",
  "image_url": "https://sample_url.jpg",
  "price": 1000,
  "stock": 10,
  "UserId": 1,
  "createdAt": "2020-12-17T04:36:32.891Z",
  "updatedAt": "2020-12-17T04:36:32.891Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please log in as admin"
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
  delete product 

Request:

- headers: access_token: 'string'
- params: id: 'integer'

Response:

- status: 200
- body:

```json
{
    "message": "successfully deleted"
}
```

- status: 401
- body:

```json
{
  "message": "please log in as admin"
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