List of available endpoints:
​

---
- `POST /login`
- `POST /register`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /carts`
- `POST /carts`
- `PATCH /carts`
- `DELETE /carts/:id`
---
### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Success Response:

- status: 200
- body:
  ​

```json
{
  "access_token": "jsonwebtoken string"
}
```

Error Response:

- status: 400
- body:
  ​

```json
{
  "message": "Invalid Email"
}
```
OR
```json
{
  "message": "Invalid Password"
}
```
### POST /logincustomer

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Success Response:

- status: 200
- body:
  ​

```json
{
  "access_token": "jsonwebtoken string"
}
```

Error Response:

- status: 400
- body:
  ​

```json
{
  "message": "Invalid Email"
}
```
OR
```json
{
  "message": "Invalid Password"
}
```
### POST /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": 2,
  "email": "test@gmail.com"
}
```

### GET /products

description:
get all products

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
    "data": [
    {
        "id": 1,
        "name": "Anggora",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/1200px-VAN_CAT.png",
        "price": 600000,
        "stock": 2,
        "createdAt": "2020-10-19T17:00:00.000Z",
        "updatedAt": "2020-10-19T17:00:00.000Z"
    },
    {
        "id": 2,
        "name": "Munchkin",
        "image_url": "https://i.pinimg.com/originals/86/9c/12/869c1240796d51f799c63fc2bdf190d9.jpg",
        "price": 800000,
        "stock": 3,
        "createdAt": "2020-10-19T17:00:00.000Z",
        "updatedAt": "2020-10-19T17:00:00.000Z"
    },
    {
        "id": 3,
        "name": "Persia",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg",
        "price": 500000,
        "stock": 5,
        "createdAt": "2020-10-19T17:00:00.000Z",
        "updatedAt": "2020-10-19T17:00:00.000Z"
    },
    {
        "id": 4,
        "name": "Maine Coon",
        "image_url": "https://i2.wp.com/welovecatsandkittens.com/wp-content/uploads/2019/02/mc-1.jpg?resize=650%2C729&ssl=1",
        "price": 1000000,
        "stock": 1,
        "createdAt": "2020-10-19T17:00:00.000Z",
        "updatedAt": "2020-10-19T17:00:00.000Z"
    },
    {
        "id": 5,
        "name": "Ragdoll",
        "image_url": "https://i.pinimg.com/originals/64/60/b8/6460b864d8cbecc1c58522e62ee37a38.jpg",
        "price": 1300000,
        "stock": 1,
        "createdAt": "2020-10-19T17:00:00.000Z",
        "updatedAt": "2020-10-19T17:00:00.000Z"
    }
    ]
}
```
### POST /products

description:
add new product

Request:
- headers: access_token (string)
- data:

```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```

Response:

- status: 201
- body:

```json
{
    "id": 4,
    "name": "Maine Coon",
    "image_url": "https://i2.wp.com/welovecatsandkittens.com/wp-content/uploads/2019/02/mc-1.jpg?resize=650%2C729&ssl=1",
    "price": 1000000,
    "stock": 2,
    "createdAt": "2020-10-19T17:00:00.000Z",
    "updatedAt": "2020-10-19T17:00:00.000Z"
}
```
### GET /products/:id

description:
get product by id

Request:
- headers: access_token (string)
- params:
  - id: "integer" required

Response:

- status: 200
- body:

```json
{
    "id": 4,
    "name": "Maine Coon",
    "image_url": "https://i2.wp.com/welovecatsandkittens.com/wp-content/uploads/2019/02/mc-1.jpg?resize=650%2C729&ssl=1",
    "price": 1000000,
    "stock": 1,
    "createdAt": "2020-10-19T17:00:00.000Z",
    "updatedAt": "2020-10-19T17:00:00.000Z"
}
```

### PUT /products/:id

description:
to update product

Request:

- headers: access_token (string)
- params:
  - id: "integer" required
- data:

```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer"
}
```

Success Response:

- status: 200
- body:

```json
{
  "data": {
        "id": 4,
        "name": "Maine Coon",
        "image_url": "https://i2.wp.com/welovecatsandkittens.com/wp-content/uploads/2019/02/mc-1.jpg?resize=650%2C729&ssl=1",
        "price": 1000000,
        "stock": 1,
        "createdAt": "2020-10-19T17:00:00.000Z",
        "updatedAt": "2020-10-19T17:00:00.000Z"
    }
}
```
Error Response:

- status: 404
- body:

```json
{
  "message": "Id not found"
}
```
### DELETE /products/:id

description: to delete product

Request:

- headers: access_token (string)
- params:
  - id: "integer" required

Response:

- status: 200
- body:

```json
{
    "message": "Product success to delete"
}
```

### GET /carts

description: to get all carts

Request:

- headers: access_token (string)

Success Response:

- status: 200
- body:

```json
[
    {
        "id": 29,
        "quantity": 1,
        "UserId": 4,
        "ProductId": 3,
        "createdAt": "2020-12-17T06:04:52.737Z",
        "updatedAt": "2020-12-17T06:39:06.958Z",
        "Product": {
            "id": 3,
            "name": "Persia",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg",
            "price": 500000,
            "stock": 5,
            "createdAt": "2020-10-19T17:00:00.000Z",
            "updatedAt": "2020-10-19T17:00:00.000Z"
        }
    }
]
```

### POST /carts

description: add product to cart

Request:

- headers: access_token (string)
- data:

```json
{
  "ProductId": "integer",
}
```

Success Response:

- status: 201
- body:

```json
{
    "id": 3,
    "name": "Persia",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg",
    "price": 500000,
    "stock": 1,
    "createdAt": "2020-10-19T17:00:00.000Z",
    "updatedAt": "2020-10-19T17:00:00.000Z"
}
```
Error Response:

- status: 400
- body:

```json
{
    "message": "No more stock"
}
```
### PATCH /carts

description: to update cart quantity

Request:

- headers: access_token (string)
- data:

```json
{
  "cartId": "integer",
  "addOrRemove": "string"
}
```

Success Response:

- status: 200
- body:

```json
{
    "id": 3,
    "name": "Persia",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg",
    "price": 500000,
    "stock": 2,
    "createdAt": "2020-10-19T17:00:00.000Z",
    "updatedAt": "2020-10-19T17:00:00.000Z"
}
```
Error Response:

- status: 400
- body:

```json
{
    "message": "No more stock"
}
```
### DELETE /carts/:id

description: to remove product from cart

Request:

- headers: access_token (string)
- params:
  - id: "integer" required

Response:

- status: 200
- body:

```json
{
    "message": "Success to delete"
}
```
