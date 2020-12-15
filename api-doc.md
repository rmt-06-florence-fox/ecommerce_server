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
  log in admin user

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
    "access_token": "jwt string",
    "fullname" : "string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "invalid email/password"
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
  get all list products that admin user created. noted: everyone can read the list even they don't get access token

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