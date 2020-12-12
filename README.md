# ecommerce_server

POSTMAN Documentation  
[https://documenter.getpostman.com/view/13590478/TVmQfcBZ](https://documenter.getpostman.com/view/13590478/TVmQfcBZ)

DEMO  
[https://e-commerce-adhim1st.web.app/](https://e-commerce-adhim1st.web.app/)

List of available endpoints:

- `POST /login`
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

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
  "access_token": "string"
}
```

### POST /products

description:
Create one product

Request:

- headers: access_token

- data:

```json
{
  "name": "Iphone 12",
  "image_url": "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
  "price": 14999000,
  "stock": 100
}
```

​Response:

- status: 201
- body:
  ​

```json
{
  "id": 1,
  "name": "Iphone 12",
  "image_url": "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
  "price": 14999000,
  "stock": 100,
  "updatedAt": "2020-12-07T11:47:59.931Z",
  "createdAt": "2020-12-07T11:47:59.931Z"
}
```

### GET /products

Description: Get all products

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
  ​

```json
[
    {
        "id": 3
        "name": "Iphone 12 128GB",
        "image_url": "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
        "price": 16499000,
        "stock": 20,
        "createdAt": "2020-12-12T05:42:34.594Z",
        "updatedAt": "2020-12-12T07:14:24.762Z"
    }
    ...
]
```

### GET /products/:id

Description: Get all products

Request:

- headers:
  - access_token: string
  - params:

```json
{
  "id": 3
}
```

Response:

- status: 200
- body:
  ​

```json
[
    {
        "id": 3
        "name": "Iphone 12 128GB",
        "image_url": "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
        "price": 16499000,
        "stock": 20,
        "createdAt": "2020-12-12T05:42:34.594Z",
        "updatedAt": "2020-12-12T07:14:24.762Z"
    }
]
```

### PUT /products/:id

description:
Edit one product

Request:

- headers: access_token
- params:

```json
{
  "id": 2
}
```

- data:

```json
{
  "name": "Iphone 12 128GB",
  "image_url": "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
  "price": 16499000,
  "stock": 20
}
```

​Response:

- status: 200
- body:
  ​

```json
[
  1,
  [
    {
      "id": 2,
      "name": "Iphone 12 128GB",
      "image_url": "https://www.citypng.com/public/uploads/small/21602681980nyvpfanmd9fycm48ugtwzaiejtxxvsjzc8uaf0yglia3ijghfcd343eq3cdqvl6sgxs8gl05dh7ttkigntwkvme8x1uxazefw9rb.png",
      "price": 16499000,
      "stock": 20,
      "UserId": 1,
      "createdAt": "2020-12-07T12:57:36.640Z",
      "updatedAt": "2020-12-07T13:01:42.608Z"
    }
  ]
]
```

### DELETE /products/:id

description:
Delete one product

Request:

- headers: access_token

- params:

```json
{
  "id": 2
}
```

​Response:

- status: 200
- body:
  ​

```json
{
  "message": "successfully delete a product"
}
```
