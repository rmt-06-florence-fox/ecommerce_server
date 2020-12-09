# ecommerce_server

## User Login

**Routes**
* /login

**Method**
* `POST`

**Data Required**
```
`email = [string]`
`password = [string]`
```

**Success Response**
  * Status : 200
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzUyNDEyOH0.u19E-FuKJQ8ii6pAozI0NFo284hEY9T3ezCFo5uC8OA"
}
```

**Error Response**
 * Status : 400
```
{
    "message": "Invalid Email / Password !"
}
```
-----

## Create Product

**Routes**
* /products

**Method**
* `POST`

**Data Required**
```
`name = [string]`
`image_url = [string]`
`price = [integer]`
`stock = [integer]`
```

**Success Response**
```
{
    "id": 1,
    "name": "kopi",
    "image_url": "https://foto.kontan.co.id/7WnubWqdvLyWbtVf61iSp76-EjI=/smart/2013/07/31/1016243794p.jpg",
    "price": 20000,
    "stock": 2,
    "updatedAt": "2020-12-09T14:58:55.192Z",
    "createdAt": "2020-12-09T14:58:55.192Z"
}
```

**Error Response**
  * Status : 400
```
{
    "message": [
        "Product.name cannot be null",
        "Product.image_url cannot be null",
        "Product.price cannot be null",
        "Product.stock cannot be null"
    ]
}
```
---
## Get Product

**Routes**
* /products

**Method**
* `GET`

**Success Response**
```
{
    "id": 1,
    "name": "kopi",
    "image_url": "https://foto.kontan.co.id/7WnubWqdvLyWbtVf61iSp76-EjI=/smart/2013/07/31/1016243794p.jpg",
    "price": 20000,
    "stock": 2,
    "updatedAt": "2020-12-09T14:58:55.192Z",
    "createdAt": "2020-12-09T14:58:55.192Z"
}
```

**Error Response**
```
{
    "message": "Please login first !"
}
```
----
## Update Product

**Routes**
* /products/:id

**Method**
* `PATCH`


**Data Required**
```
`name = [string]`
`image_url = [string]`
`price = [integer]`
`stock = [integer]`
```

**Success Response**
```
{
    "id": 1,
    "name": "kopi",
    "image_url": "https://foto.kontan.co.id/7WnubWqdvLyWbtVf61iSp76-EjI=/smart/2013/07/31/1016243794p.jpg",
    "price": 25000,
    "stock": 10,
    "createdAt": "2020-12-09T14:58:55.192Z",
    "updatedAt": "2020-12-09T15:21:20.308Z"
}
```

**Error Response**
```
{
    "message": [
        "Name must not be empty as it will help others recognize this product !",
        "Image must not be empty as it will help others recognize this product !",
        "Validation min on price failed",
        "Validation min on stock failed"
    ]
}
```
----
## Delete Product

**Routes**
* /products/:id

**Method**
* `DELETE`

**Success Response**
```
{
    "message": "This product has been successfully deleted !"
}
```

**Error Response**
```
{
    "message": "Product Not Found !"
}
```