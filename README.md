# ecommerce_server

## Han Store

#

```
Admin Login

email     : admin@mail.com
password  : adminku
```
```
.env

SECRET     = hahihuheho
SALT           = 10
PASSWORD_ADMIN = adminganteng
```

## Endpoints

#

## URL
```
Server URL    : https://e-commerce207.herokuapp.com
CMS URL       : https://e-commerce207.web.app
Customer URL  : https://han-store.web.app/
```
#

### POST /admin/signin

> Sign in for admin

_Request Header_

```
none
```

_Request Body_

```
email : admin@mail.com
password : adminku
```

_Response Success (200)_

```
{
  access_token : "admin token string"
}
```

_Response Bad Request (400)_

```
{
  message : "Invalid email/password"
}
```

_Response Error Not Found (404)_

```
{
  message : "Invalid account"
}
```

_Response Internal Server Error (500)_

```
{
  message : "Internal server error"
}
```

### POST /signup

> Sign up for customer

_Request Header_

```
none
```

_Request Body_

```
email     : rean@mail.com
password  : rererere
```

_Response Created (201)_

```
{
  id: 1,
  email: rean@mail.com
}
```

_Response Bad Request (400)_

```
{
  message : "Email has been used",
  message : "Password at least must be 6-20 characters"
}
```

_Response Internal Server Error (500)_

```
{
  message : "Internal server error"
}
```

### POST /signin

> Sign in for customer

_Request Header_

```
none
```

_Request Body_

```
email : rean@mail.com
password : rererere
```

_Response Success (200)_

```
{
  access_token : "customer token string"
}
```

_Response Bad Request (400)_

```
{
  message : "Invalid email/password"
}
```

_Response Error Not Found (404)_

```
{
  message : "Invalid account"
}
```

_Response Internal Server Error (500)_

```
{
  message : "Internal server error"
}
```

### POST /products

> Create product by admin

_Request Header_

```
access_token : 'admin token string'
```

_Request Body_

```
{
  "name": "Kangkung",
  "image_url": "https://akcdn.detik.net.id/community/media/visual/2019/11/15/0a4de33f-2ea7-4c37-977e-97e57375c359.jpeg?w=700&q=90",
  "price": 30900,
  "stock": 15,
}
```

_Response Created (201)_

```
{
    "id": 3,
    "name": "Kangkung",
    "image_url": "https://akcdn.detik.net.id/community/media/visual/2019/11/15/0a4de33f-2ea7-4c37-977e-97e57375c359.jpeg?w=700&q=90",
    "price": 30900,
    "stock": 15,
    "UserId": 1,
    "updatedAt": "2020-12-12 20:06:38.311+07",
    "createdAt": "2020-12-12 20:06:38.311+07"
}
```

_Response Bad Request (400)_

```
{
  message : "Name can't be empty",
  message : "Image Url can't be empty",
  message : "Price can't be empty",
  message : "Stock can't be a negative number",
  message : "Stock must be a number"
}
```

_Response Unauthorized (401)_

```
{
  message : 'Please login first'
}
```

_Response Internal Server Error (500)_

```
{
  message : "Internal server error"
}
```

### GET /products

> Fetch all products

_Request Header_

```
access_token : 'admin token string'
```

_Request Body_

```
{
  none
}
```

_Response Success (200)_

```
[
  {
    "id": 1,
    "name": "Mainan",
    "image_url": "https://akcdn.detik.net.id/community/media/visual/2019/11/15/0a4de33f-2ea7-4c37-977e-97e57375c359.jpeg?w=700&q=90",
    "price": 20000,
    "stock": 5,
    "UserId": 1,
    "createdAt": "2020-12-12 20:06:38.311+07",
    "updatedAt": "2020-12-12 20:06:38.311+07"
  },
  {
    "id": 3,
    "name": "Kangkung",
    "image_url": "https://akcdn.detik.net.id/community/media/visual/2019/11/15/0a4de33f-2ea7-4c37-977e-97e57375c359.jpeg?w=700&q=90",
    "price": 30900,
    "stock": 15,
    "UserId": 1,
    "createdAt": "2020-12-12 20:06:38.311+07",
    "updatedAt": "2020-12-12 20:06:38.311+07"
  }
]
```

_Response Internal Server Error (500)_

```
{
  message : "Internal server error"
}
```

### GET /products/:id

> Fetch product by id

_Request Header_

```
access_token : 'admin token string'
```

_Request Body_

```
{
  none
}
```

_Request Params_

```
{
  id : 1
}
```

_Response Success (200)_

```
{
  "id": 1,
  "name": "Mainan",
  "image_url": "https://akcdn.detik.net.id/community/media/visual/2019/11/15/0a4de33f-2ea7-4c37-977e-97e57375c359.jpeg?w=700&q=90",
  "price": 20000,
  "stock": 5,
  "UserId": 1,
  "createdAt": "2020-12-12 20:06:38.311+07",
  "updatedAt": "2020-12-12 20:06:38.311+07"
}
```

_Response Internal Server Error (500)_

```
{
  message : "Internal server error"
}
```

### PUT /products/:id

> Edit product by id

_Request Header_

```
access_token : 'admin token string'
```

_Request Params_

```
id : 1
```

_Request Body_

```
{
  "name": "Mainan Anak",
  "image_url": "https://akcdn.detik.net.id/community/media/visual/2019/11/15/0a4de33f-2ea7-4c37-977e-97e57375c359.jpeg?w=700&q=90",
  "price": 25000,
  "stock": 20
}
```

_Response Success (200)_

```
{
  "id": 1,
  "name": "Mainan Anak",
  "image_url": "https://akcdn.detik.net.id/community/media/visual/2019/11/15/0a4de33f-2ea7-4c37-977e-97e57375c359.jpeg?w=700&q=90",
  "price": 25000,
  "stock": 20,
  "UserId": 1,
  "createdAt": "2020-12-12 20:06:38.311+07",
  "updatedAt": "2020-12-17 15:08:48.649+07"
}
```

_Response(400)_

```
[
  {
    message: "Price can't be a negative number"
  },
  {
    message: "Stock must be a number"
  }
]
```

_Response Unauthorized (401)_

> Don't have token string
```
{
  "message": "Please login first"
}
```

_Response Unauthorized (401)_

> Different token string

```
{
  "message": "Unauthorized user"
}
```

_Response Error Not Found (404)_

```
{
  "message": "Error not found"
}
```

_Response Internal Server Error (500)_
```
{
  message: "Internal server error"
}
```


### DELETE /products/:id

> Delete product by id

_Request Header_

```
access_token : 'admin token string'
```

_Request Params_

```
id : 3
```

_Request Body_

```
{
  none
}
```

_Response Success (200)_

```
{
  "message": "Product has been deleted:)"
}
```

_Response Unauthorized (401)_

> Don't have access token
```
{
  "message": "Please login first"
}
```

_Response Unauthorized (401)_

> Different access token
```
{
  "message": "Unauthorized User"
}
```

### POST /cart/:productid

> Create or increase product to cart for customer

_Request Header_

```
access_token: 'customer token string'
```

_Request Params_

```
ProductId: "Integer"
```

_Response Success (200)_

```
{
  id: 2,
  ProductId: 1,
  UserId: 2,
  quantity: 3,
  updatedAt: "2020-12-17 15:08:48.517+07",
  createdAt: "2020-12-17 15:08:48.517+07"
}

```

_Response Created (201)_

```
{
  quantity: 1,
  UserId: 2,
  ProductId: 1
}
```

_Response Bad Request (400)_

```
{
  message: "Out of stock"
}
```

_Response Unauthorized (401)_

> Don't have access token
```
{
  message: "Please login first"
}
```

_Response Unauthorized (401)_

> Different access token
```
{
  message: "Unauthorized user"
}
```

_Response Internal Server Error (500)_

```
{
  message: 'Internal server error'
}
```

### GET /cart

> Fetch all carts

_Request Header_

```
access_token: "customer token string"
```

_Request Body_

```
none
```

_Response Success (200)_

```
[
  data: {
    id: 2,
    ProductId: 1,
    UserId: 2,
    quantity: 3
  }
]
```

_Response Unauthorized (401)_

> Don't have access token
```
{
  message: "Please login first"
}
```

_Response Unauthorized (401)_

> Different access token
```
{
  message: "Unauthorized user"
}
```

_Response Internal Server Error (500)_

```
{
  message: 'Internal server error'
}
```

### PUT /cart/:id

> Create or increase product to cart for customer

_Request Header_

```
access_token: 'customer token string'
```

_Request Params_

```
id: "Integer"
```

_Response Success (200)_

```
{
  id: 2,
  ProductId: 1,
  UserId: 2,
  quantity: 2,
  updatedAt: "2020-12-17 15:08:48.517+07",
  createdAt: "2020-12-17 18:09:49.517+07"
}

```

_Response Unauthorized (401)_

> Don't have access token
```
{
  message: "Please login first"
}
```

_Response Unauthorized (401)_

> Different access token
```
{
  message: "Unauthorized user"
}
```

_Response Error Not Found (404)_

```
{
  message: "Error not found"
}
```

_Response Internal Server Error (500)_

```
{
  message: 'Internal server error'
}
```

### DELETE /cart/:id

> Delete a cart for customer by id

_Request Header_

```
access_token: "customer token string"
```

_Request Body_

```
id: "Integer"
```

_Response Success (200)_

```
{
  message: 'Removed from cart'
}
```

_Response Unauthorized (401)_

> Don't have access token
```
{
  message: "Please login first"
}
```

_Response Unauthorized (401)_

> Different access token
```
{
  message: "Unauthorized user"
}
```

_Response Error Not Found (404)_

```
{
  message: "Error not found"
}
```

_Response Internal Server Error (500)_

```
{
  message: 'Internal server error'
}
```

### PUT /cart/checkout

> Checkout all carts from signed in customer

_Request Header_

```
access_token: 'customer token string'
```

_Request Body_

```
none
```

_Response Success (200)_

```
{
  message: "Thanks for shopping with us"
}
```

_Response Unauthorized (401)_

> Don't have access token
```
{
  message: "Please login first"
}
```

_Response Unauthorized (401)_

> Different access token
```
{
  message: "Unauthorized user"
}
```

_Response Internal Server Error (500)_

```
{
  message: "Internal server error"
}
```