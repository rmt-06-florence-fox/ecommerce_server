# ecommerce_server

```

Akun Admin
email : admin@email.com
password : qwerty
```

## Restful endpoints
#
# URL
```
Client URL : https://candra-admin.web.app/
Server URL : 'https://candra-store.herokuapp.com'
Customer URL : https://candra-store.web.app/
```

### GET/login
>login
_Request Header_
```
none
```
_Request Body_
```
email : admin@email.com
password : qwerty
```
_Response(200)_
```
{
  access_token : "token",
  email: admin@email.com,
  id: 1
}
```
_Response(401)_
```
{
  message : 'Invalid Account!'
}
```
_Response(400)_
```
{
  message : "Invalid email/password"
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```
### POST /products
>create product
_Request Header_
```
access_token : 'token'
```
_Request Body_
```
{
  name : 'Air Jordan 1',
  "image_url": "https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg",
  price : 5000000,
  stock : 4
}
```
_Response(201)_
```
{
  "id": 1,
  "name" : 'Air Jordan 1',
  "image_url": "https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg",
  "price" : 5000000,
  "stock" : 6
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```

### GET /products
>fetch all products
_Request Header_
```
access_token : 'token'
```
_Request Body_
```
{
  none
}
```
_Response(200)_
```
{
  "products": [
        {
            "id": 1,
            "name": "Air Jordan 1",
            "image_url": "https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg",
            "price": 5000000,
            "stock": 6,
            "createdAt": "2020-12-12T08:31:05.825Z",
            "updatedAt": "2020-12-12T08:31:05.825Z"
        },
        ...
    ]
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```

### GET /products/:id
>find by id
_Request Header_
```
access_token : 'token'
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
_Response(200)_
```
{
  {
    "id": 1,
    "name": "Air Jordan 1",
    "image_url": "https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg",
    "price": 5000000,
    "stock": 6,
    "createdAt": "2020-12-12T08:31:05.825Z",
    "updatedAt": "2020-12-12T08:31:05.825Z"
  },
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```
### put /products/:id
>edit product
_Request Header_
```
access_token : 'token'
```
_Request Params_
```
id : 1
```
_Request Body_
```
{
    "name": "Air Jordan 1",
    "image_url": "https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg",
    "price": 5000000,
    "stock": 6,
    "createdAt": "2020-12-12T08:31:05.825Z",
    "updatedAt": "2020-12-12T08:31:05.825Z"
}
```
_Response(200)_
```
{ 
    "id": 1,
    "name": "Air Jordan 1",
    "image_url": "https://sneakernews.com/wp-content/uploads/2020/06/jordan-1-wmns-satin-snakeskin-CD0461-601-4.jpg",
    "price": 5000000,
    "stock": 6,
    "createdAt": "2020-12-12T08:31:05.825Z",
    "updatedAt": "2020-12-12T08:31:05.825Z"
}
```
_Response(401)_
```
{ 
  "message": "please login first"
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```
### delete /products/:id
>delete product
_Request Header_
```
access_token : 'token'
```
_Request Params_
```
id : 1
```
_Request Body_
```
{
  none
}
```
_Response(200)_
```
{ 
  "message": "Successfully delete item"
}
```
_Response(401)_
```
{ 
  "message": "please logoin first"
}
```
_Response(500)_
```
{
  message : "internal server error"
}
```
### POST/register
>register
_Request Header_
```
none
```
_Request Body_
```
email : customer@email.com
password : abcdef
```
_Response(200)_
```
{
  {
    "id": 2,
    "email" : customer@email.com,
    "password" : abcdef
    }
}
```
_Response(400)_
```
{
  {
    "messages": [
        "email cannot be empty",
    ]
  }
}
```

### POST/cart
>creat or edit a cart for customer
_Request Header_
```
access_token: 'token'
```
_Request Body_
```
productId: number
```
_Response(201)_
```
{
    {
        "id": 31,
        "UserId": 2,
        "ProductId": 2,
        "quantity": 1,
        "createdAt": "2020-12-17T04:01:40.582Z",
        "updatedAt": "2020-12-17T04:01:40.582Z",
        "Product": {object}
    }
}
```
_Response(500)_
```
{
  message: 'Cannot add this item to cart'
}
```
### GET/cart
>fetch all unpaid carts for customer
_Request Header_
```
access_token: 'token'
```
_Request Body_
```
none
```
_Response(200)_
```
{
    "carts": [
        {
            "id": 31,
            "UserId": 2,
            "ProductId": 2,
            "quantity": 1,
            "createdAt": "2020-12-17T04:01:40.582Z",
            "updatedAt": "2020-12-17T04:01:40.582Z",
            "Product": {
                "id": 2,
                "name": "Air Jordan 11",
                "image_url": "https://images.complex.com/complex/images/c_crop,h_1092,w_1941,x_32,y_574/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/gxtabuctifqxylvhauhl/air-jordan-11-xi-retro-bred-2019-378037-061-pair",
                "price": 6000000,
                "stock": 5,
                "createdAt": "2020-12-12T09:29:27.866Z",
                "updatedAt": "2020-12-12T09:33:42.089Z"
            }
        }
    ]
}
```
_Response(500)_
```
{
  message: 'internal server error'
}
```
### DELETE/carts/
>delete a cart for customer
_Request Header_
```
access_token: 'string'
```
_Request Body_
```
cartId
```
_Response(200)_
```
{
  message: 'succesfully deleted an item'
}
```
_Response(500)_
```
{
  message: 'internal server error'
}
```