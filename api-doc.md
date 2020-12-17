# kanban-server

​
List of available endpoints:
​
- `GET /products`
- `POST /admin/login`
- `POST /customer/register`
- `POST /customer/login`

Routes below need authentication and authorization
- `POST /admin/products`
- `PUT /admin/products/:id`
- `DELETE /admin/products/:id`
- `GET /customer/carts`
- `POST /customer/carts/:ProductId`
- `PATCH /customer/carts/:ProductId`
- `DELETE /customer/carts/:ProductId`
- `GET /customer/wishlist`
- `POST /customer/wishlist/:ProductId`
- `DELETE /customer/wishlist/:ProductId`
- `PUT /customer/checkout`
- `GET /customer/transactions`


### GET /products

Response:
- status: 200
- body: 

```json
[
    {
        "id": 4,
        "name": "Lenovo Ideapad",
        "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-7756348/lenovo_lenovo-ideapad-3---14ada05-4aid-laptop--amd-athlon-gold-3150u---4gb-onboard---4gb-ddr4---512gb-ssd-m-2-pcie---14-inch-fhd---win-10---ohs-2019-_full01.jpg",
        "price": 15000000,
        "stock": 10,
        "createdAt": "2020-12-12T03:05:34.629Z",
        "updatedAt": "2020-12-12T03:05:34.629Z"
    },
    {
        "id": 5,
        "name": "Lemari IKEA",
        "image_url": "https://malangantik.com/wp-content/uploads/2019/09/IKEA-PAX-Wardrobe-Auli-Ilseng-a.jpg",
        "price": 2000000,
        "stock": 10,
        "createdAt": "2020-12-12T03:06:36.931Z",
        "updatedAt": "2020-12-12T03:06:36.931Z"
    },
    {
        "id": 6,
        "name": "Kaos Uniqlo",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/6/5166058/5166058_eb0c056b-4885-4a21-a82e-88a5857c9b62_869_869.jpg",
        "price": 99000,
        "stock": 10,
        "createdAt": "2020-12-12T03:08:29.494Z",
        "updatedAt": "2020-12-12T03:08:29.494Z"
    },
    {
        "id": 3,
        "name": "Onitsuka Tiger Mexico 70",
        "image_url": "https://cf.shopee.co.id/file/2106028048f8d7c04d045db9a8fc1e41",
        "price": 2000000,
        "stock": 10,
        "createdAt": "2020-12-12T03:04:47.414Z",
        "updatedAt": "2020-12-12T07:44:30.391Z"
    }
]
```

- status: 500
- body: 

```json
{
  "message": "Internal Server Error"
}
```
### POST admin/login

Request:

- data:

```json
{
  "email": "admin@mail.com",
  "password": "1234"
}
```

Response:

- status: 200
- body:
  

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```
Response:

- status: 401
- body:
  ​

```json
{
    "message": "Invalid email/password"
}
```
Response:

- status: 500
- body:
  ​

```json
{
    "message": "Internal Server Error"
}
```

### POST /admin/products
Request:

- headers: access_token

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```
- body: 

```json
{
    "name": "Kaos Uniqlo Perempuan",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/6/5166058/5166058_eb0c056b-4885-4a21-a82e-88a5857c9b62_869_869.jpg",
    "price": 99000,
    "stock": 10
}
```

​Response:

- status: 201
- body:
  ​

```json
{
    "name": "Kaos Uniqlo Perempuan",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/6/5166058/5166058_eb0c056b-4885-4a21-a82e-88a5857c9b62_869_869.jpg",
    "price": 99000,
    "stock": 10
}
```
- status: 500
- body:
  ​

```json
{
    "message": "Internal Server Error"
}
```

- status: 401
- body:
  ​

```json
{
    "message": "You must login first"
}
```
- status: 400
- body:

```json
{
    "message": "[Price should not be empty]"
}
```

### PUT /admin/products/:id

Request:

- headers: access_token

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```
- body: 

```json
{
    "name": "Kaos Uniqlo Laki",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/6/5166058/5166058_eb0c056b-4885-4a21-a82e-88a5857c9b62_869_869.jpg",
    "price": 99000,
    "stock": 10
}
```

​Response:

- status: 200
- body:
  ​

```json
{
    "name": "Kaos Uniqlo Laki",
    "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/6/5166058/5166058_eb0c056b-4885-4a21-a82e-88a5857c9b62_869_869.jpg",
    "price": 99000,
    "stock": 10
}
```
- status: 500
- body:
  ​

```json
{
    "message": "Internal Server Error"
}
```

- status: 401
- body:
  ​

```json
{
    "message": "You must login first"
}

- status: 404
- body:
  ​

```json
{
    "message": "Error! Data not found"
}
```

- status: 400
- body:

```json
{
    "message": "[Price should not be empty]"
}
```
### DELETE /admin/products/:id

Request:

- headers: access_token

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```

Response:

- status: 200
- body:

```json
Request:

- headers: access_token

```json
{
    "message": "Successfully delete product"
}
```

- status: 500
- body:
  ​

```json
{
    "message": "Internal Server Error"
}
```

- status: 401
- body:
  ​

```json
{
    "message": "You must login first"
}

- status: 404
- body:
  ​

```json
{
    "message": "Error! Data not found"
}
```

### POST /customer/register

Request:

- data:

```json
{
  "email": "agnes@mail.com",
  "password": "qweqwe"
}
```

Response:

- status: 201
- body:
  

```json
{
    "id": 1,
    "email": "agnes@mail.com",
    "role": "customer"
}
```
Response:

- status: 400
- body:
  ​

```json
{
    "message": "['Email should not be empty', 'Password should not be empty']"
}
```
Response:

- status: 500
- body:
  ​

```json
{
    "message": "Internal Server Error"
}
```


### POST /customer/login

Request:

- data:

```json
{
  "email": "agnes@mail.com",
  "password": "qweqwe"
}
```

Response:

- status: 200
- body:
  

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```
Response:

- status: 401
- body:
  ​

```json
{
    "message": "Invalid email/password"
}
```
Response:

- status: 500
- body:
  ​

```json
{
    "message": "Internal Server Error"
}
```
### GET /customer/carts

Request:
- headers: 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```

Response:
- status: 200
- body: 

```json
[
    {
        "id": 46,
        "UserId": 10,
        "ProductId": 6,
        "quantity": 2,
        "createdAt": "2020-12-17T01:54:03.338Z",
        "updatedAt": "2020-12-17T01:54:06.341Z",
        "Product": {
            "id": 6,
            "name": "Kaos Uniqlo",
            "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/6/5166058/5166058_eb0c056b-4885-4a21-a82e-88a5857c9b62_869_869.jpg",
            "price": 99000,
            "stock": 9,
            "createdAt": "2020-12-12T03:08:29.494Z",
            "updatedAt": "2020-12-16T23:53:40.381Z"
        }
    },
    {
        "id": 47,
        "UserId": 10,
        "ProductId": 4,
        "quantity": 1,
        "createdAt": "2020-12-17T01:54:09.998Z",
        "updatedAt": "2020-12-17T01:54:09.998Z",
        "Product": {
            "id": 4,
            "name": "Lenovo Ideapad",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-7756348/lenovo_lenovo-ideapad-3---14ada05-4aid-laptop--amd-athlon-gold-3150u---4gb-onboard---4gb-ddr4---512gb-ssd-m-2-pcie---14-inch-fhd---win-10---ohs-2019-_full01.jpg",
            "price": 15000000,
            "stock": 5,
            "createdAt": "2020-12-12T03:05:34.629Z",
            "updatedAt": "2020-12-16T23:59:33.647Z"
        }
    }
]
```
- status: 401
- body: 

```json
{
    "message": "Please login first"
}
```

- status: 500
- body:

```json
{
    "message": "Internal Server Error"
}
```

### POST /customer/carts/:ProductId

Request:
- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```

- params: ProductId (integer)

Response: 
- status: 201
- body: 

```json
{
    "id": 47,
    "UserId": 10,
    "ProductId": 4,
    "quantity": 1,
    "updatedAt": "2020-12-17T01:54:09.998Z",
    "createdAt": "2020-12-17T01:54:09.998Z"
}
```

- status: 401
- body:

```json
{
    "message": "Please login first"
}
```

- status: 404
- body: 

```json
{
  "message": "Error! Data not found"
}
```

- status: 500
- body:

```json
{
    "message": "Internal Server Error"
}
```

### PATCH /customer/carts/:ProductId

Request:
- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```

- params: ProductId (integer)

Response

- status: 200
- body: 

```json
{
    "id": 47,
    "UserId": 10,
    "ProductId": 4,
    "quantity": 2,
    "createdAt": "2020-12-17T01:54:09.998Z",
    "updatedAt": "2020-12-17T02:00:40.493Z"
}
```
- status: 401
- body:

```json
{
    "message": "Please login first"
}
```
- status: 500
- body:

```json
{
    "message": "Internal Server Error"
}
```

### DELETE /customer/carts/:ProductId
Request:
- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```

- params: ProductId (integer)

Response

- status: 200
- body: 

```json
{
  "message": "Successfully delete cart"
}

```
- status: 401
- body:

```json
{
    "message": "Please login first"
}
```
- status: 500
- body:

```json
{
    "message": "Internal Server Error"
}
```

### GET /customer/wishlist

Request:
- headers: 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```

Response:
- status: 200
- body: 

```json
[
    {
        "id": 46,
        "UserId": 10,
        "ProductId": 6,
        "quantity": 2,
        "createdAt": "2020-12-17T01:54:03.338Z",
        "updatedAt": "2020-12-17T01:54:06.341Z",
        "Product": {
            "id": 6,
            "name": "Kaos Uniqlo",
            "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/6/5166058/5166058_eb0c056b-4885-4a21-a82e-88a5857c9b62_869_869.jpg",
            "price": 99000,
            "stock": 9,
            "createdAt": "2020-12-12T03:08:29.494Z",
            "updatedAt": "2020-12-16T23:53:40.381Z"
        }
    },
    {
        "id": 47,
        "UserId": 10,
        "ProductId": 4,
        "quantity": 1,
        "createdAt": "2020-12-17T01:54:09.998Z",
        "updatedAt": "2020-12-17T01:54:09.998Z",
        "Product": {
            "id": 4,
            "name": "Lenovo Ideapad",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-7756348/lenovo_lenovo-ideapad-3---14ada05-4aid-laptop--amd-athlon-gold-3150u---4gb-onboard---4gb-ddr4---512gb-ssd-m-2-pcie---14-inch-fhd---win-10---ohs-2019-_full01.jpg",
            "price": 15000000,
            "stock": 5,
            "createdAt": "2020-12-12T03:05:34.629Z",
            "updatedAt": "2020-12-16T23:59:33.647Z"
        }
    }
]
```
- status: 401
- body: 

```json
{
    "message": "Please login first"
}
```

- status: 500
- body:

```json
{
    "message": "Internal Server Error"
}
```

### POST /customer/wishlist/:ProductId

Request:
- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```

- params: ProductId (integer)

Response: 
- status: 201
- body: 

```json
{
    "id": 47,
    "UserId": 10,
    "ProductId": 4,
    "quantity": 1,
    "updatedAt": "2020-12-17T01:54:09.998Z",
    "createdAt": "2020-12-17T01:54:09.998Z"
}
```
- status: 400
- body: 

```json
{
  "message": "You have added this item to your wishlist"
}
```

- status: 401
- body:

```json
{
    "message": "Please login first"
}
```

- status: 404
- body: 

```json
{
  "message": "Error! Data not found"
}
```

- status: 500
- body:

```json
{
    "message": "Internal Server Error"
}
```
### DELETE /customer/wishlist/:ProductId

Request:
- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```

- params: ProductId (integer)

Response

- status: 200
- body: 

```json
{
  "message": "Successfully remove item from your wishlist"
}

```
- status: 401
- body:

```json
{
    "message": "Please login first"
}
```
- status: 500
- body:

```json
{
    "message": "Internal Server Error"
}
```

### PUT /customer/checkout


Request:
- headers: 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3NDA2NX0.z_XL_PgXukWPAB6YoSN4Os19ZUQRmVntrglPIvRgInw"
}
```
- body: 

```json
[
    {
        "id": 46,
        "UserId": 10,
        "ProductId": 6,
        "quantity": 2,
        "createdAt": "2020-12-17T01:54:03.338Z",
        "updatedAt": "2020-12-17T01:54:06.341Z",
        "Product": {
            "id": 6,
            "name": "Kaos Uniqlo",
            "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/6/5166058/5166058_eb0c056b-4885-4a21-a82e-88a5857c9b62_869_869.jpg",
            "price": 99000,
            "stock": 9,
            "createdAt": "2020-12-12T03:08:29.494Z",
            "updatedAt": "2020-12-16T23:53:40.381Z"
        }
    },
    {
        "id": 47,
        "UserId": 10,
        "ProductId": 4,
        "quantity": 1,
        "createdAt": "2020-12-17T01:54:09.998Z",
        "updatedAt": "2020-12-17T01:54:09.998Z",
        "Product": {
            "id": 4,
            "name": "Lenovo Ideapad",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-7756348/lenovo_lenovo-ideapad-3---14ada05-4aid-laptop--amd-athlon-gold-3150u---4gb-onboard---4gb-ddr4---512gb-ssd-m-2-pcie---14-inch-fhd---win-10---ohs-2019-_full01.jpg",
            "price": 15000000,
            "stock": 5,
            "createdAt": "2020-12-12T03:05:34.629Z",
            "updatedAt": "2020-12-16T23:59:33.647Z"
        }
    }
]
```
Response:

- status: 200
- body:

```json
{
  "message": "Checkout berhasil"
}
```

- status: 401
- body: 

```json
{
    "message": "Please login first"
}
```
- status: 500
- body:

```json
{
    "message": "Internal Server Error"
}
```