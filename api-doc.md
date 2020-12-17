# e-commerce

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /login2`
- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /carts`
- `GET /carts/history`
- `POST /carts/checkout`
- `POST /carts/:productId`
- `PATCH /carts/:cartId`
- `DELETE /carts/:cartId`


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
  "id": "integer",
  "email": "string"
}
```

- status: 400
- body:
  ​

```json
{
    "message": "email is taken"
}
```

### POST /login

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
    "access_token": "jwt_string"
}
```

- status: 400
- body:
  ​

```json
{
    "message": "Invalid email/password"
}
```


### POST /login2

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
    "access_token": "jwt_string"
}
```

- status: 400
- body:
  ​

```json
{
    "message": "Invalid email/password"
}
```


### GET /products

Request:

Response:

- status: 200
- body:
  ​

```json
{
    "products": [
        {
            "id": 1,
            "name": "penguin",
            "image_url": "https://images.unsplash.com/photo-1496509218134-fad73128e572?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            "price": 12000,
            "stock": 4,
            "category": "penguin",
            "createdAt": "2020-12-15T07:00:32.334Z",
            "updatedAt": "2020-12-16T15:30:48.449Z"
        },
        {
            "id": 2,
            "name": "penguin2",
            "image_url": "https://lithub.com/wp-content/uploads/2019/11/Chick-Peers-Out-at-the-Icy-World-c-Lindsay-McCrae-1.jpg",
            "price": 15000,
            "stock": 3,
            "category": "penguin",
            "createdAt": "2020-12-15T07:01:13.207Z",
            "updatedAt": "2020-12-16T15:30:48.502Z"
        }
    ]
}
```


### POST /products

Request:

- headers:

```json
{
  "access_token": "jwt_string"
}
```
- data:
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer",
  "category": "string",
}
```
Response:

- status: 201
- body:
  ​

```json
{
    "products": {
        "id": 3,
        "name": "penguin",
        "image_url": "https://images.unsplash.com/photo-1496509218134-fad73128e572?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "price": 12000,
        "stock": 5,
        "category": "penguin",
        "updatedAt": "2020-12-17T03:22:19.219Z",
        "createdAt": "2020-12-17T03:22:19.219Z"
    }
}
```
- status: 401
- body:
  ​

```json
{
    "message": "please login first"
}
```

### PUT /products/:id

Request:

- params:
```json
{
  "id": "integer"
}
```
- headers:

```json
{
  "access_token": "jwt_string"
}
```
- data:
```json
{
  "name": "string",
  "image_url": "string",
  "price": "integer",
  "stock": "integer",
  "category": "string",
}
```
Response:

- status: 200
- body:
  ​

```json
{
    "products": {
        "id": 3,
        "name": "penguin",
        "image_url": "https://images.unsplash.com/photo-1496509218134-fad73128e572?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "price": 12000,
        "stock": 5,
        "category": "penguin",
        "updatedAt": "2020-12-17T03:22:19.219Z",
        "createdAt": "2020-12-17T03:22:19.219Z"
    }
}
```
- status: 401
- body:
  ​

```json
{
    "message": "please login first"
}
```

### DELETE /products/:id

Request:

- params:
```json
{
  "id": "integer"
}
```
- headers:

```json
{
  "access_token": "jwt_string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "message": "products deleted"
}
```
- status: 401
- body:
  ​

```json
{
    "message": "please login first"
}
```

### GET /carts

Request:

- headers:

```json
{
  "access_token": "jwt_string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "cart": [
        {
            "total": 24000,
            "id": 19,
            "UserId": 2,
            "ProductId": 1,
            "quantity": 2,
            "price": 12000,
            "Product": {
                "id": 1,
                "name": "penguin",
                "image_url": "https://images.unsplash.com/photo-1496509218134-fad73128e572?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                "price": 12000,
                "stock": 4,
                "category": "penguin",
                "createdAt": "2020-12-15T07:00:32.334Z",
                "updatedAt": "2020-12-16T15:30:48.449Z"
            }
        }
    ]
}
```
- status: 401
- body:
  ​

```json
{
    "message": "please login first"
}
```

### GET /carts/history

Request:

- headers:

```json
{
  "access_token": "jwt_string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "histories": [
        {
            "UserId": 2,
            "name": "penguin",
            "image_url": "https://images.unsplash.com/photo-1496509218134-fad73128e572?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            "quantity": 1,
            "price": 8000,
            "total": 8000,
            "createdAt": "2020-12-15T09:59:47.438Z"
        },
        {
            "UserId": 2,
            "name": "penguin2",
            "image_url": "https://lithub.com/wp-content/uploads/2019/11/Chick-Peers-Out-at-the-Icy-World-c-Lindsay-McCrae-1.jpg",
            "quantity": 2,
            "price": 15000,
            "total": 30000,
            "createdAt": "2020-12-15T09:59:47.459Z"
        }
    ]
}
```
- status: 401
- body:
  ​

```json
{
    "message": "please login first"
}
```
### POST /carts/checkout

Request:

- headers:

```json
{
  "access_token": "jwt_string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "message": "success"
}
```
- status: 401
- body:
  ​

```json
{
    "message": "please login first"
}
```

### POST /carts/:productId

Request:

- params:
```json
{
  "productId": "integer"
}
```

- headers:

```json
{
  "access_token": "jwt_string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "cart": {
        "total": 12000,
        "id": 19,
        "quantity": 1,
        "price": 12000,
        "UserId": 2,
        "ProductId": 1,
        "updatedAt": "2020-12-17T03:30:50.592Z",
        "createdAt": "2020-12-17T03:30:50.592Z"
    }
}
```
- status: 200
- body:
  ​

```json
{
    "cart": [
        [
            [
                {
                    "id": 19,
                    "UserId": 2,
                    "ProductId": 1,
                    "quantity": 2,
                    "createdAt": "2020-12-17T03:30:50.592Z",
                    "updatedAt": "2020-12-17T03:31:26.394Z",
                    "price": 12000
                }
            ],
            1
        ]
    ]
}
```
- status: 401
- body:
  ​

```json
{
    "message": "please login first"
}
```

### PATCH /carts/:cartId

Request:


- params:
```json
{
  "cartId": "integer"
}
```

- headers:

```json
{
  "access_token": "jwt_string"
}
```

- data:

```json
{
  "value": "integer"
}
```

Response:

- status: 200
- body:
  ​

```json
[
    1
]
```
- status: 400
- body:
  ​

```json
{
    "message": "cannot add/reduce quantity"
}
```

- status: 401
- body:
  ​

```json
{
    "message": "please login first"
}
```
### DELETE /carts/:cartId

Request:

- params:
```json
{
  "cartId": "integer"
}
```

- headers:

```json
{
  "access_token": "jwt_string"
}
```


Response:

- status: 200
- body:
  ​

```json
{
    "message": "cart successfully deleted"
}
```

- status: 401
- body:
  ​

```json
{
    "message": "please login first"
}
```
