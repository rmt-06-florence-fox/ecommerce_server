# ecommerce_server


```
weird admin cms

admin login
email : tio@mail.com
password : tiotio
```

## Restful endpoints
#
# URL
```
Client URL : http://localhost:3000/
Server URL : http://localhost:8080/
```

### GET/login
>login

_Request Header_
```
none
```
_Request Body_
```
email : tio@mail.com
password : tiotio
```
_Response(200)_
```
{
  access_token : "token string"
}
```
_Response(404)_
```
{
  message : 'email is not registered'
}
```
_Response(400)_
```
{
  message : "invalid"
}
```
_Response(400)_
```
{
  message : "field can not be empty"
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
access_token : 'token string'
```
_Request Body_
```
{
  name : 'jam 2',
  "image_url": "https://www.jakartanotebook.com/images/products/72/63/22590/67/,
  price : 200000,
  stock : 10
}
```
_Response(201)_
```
{
  "id": 8,
  "name": "jam 2",
  "image_url": "https://www.jakartanotebook.com/images/products/72/63/22590/67/jam-dinding-bulat-european-style-34cm-colorful-vintage-multi-color-70.jpg",
  "price": 200000,
  "stock": 10
}
```
_Response(404)_
```
{
  message : 'email is not registered'
}
```
_Response(400)_
```
{
  message : "invalid"
}
```
_Response(400)_
```
{
  message : "field can not be empty"
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
access_token : 'token string'
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
            "id": 3,
            "name": "groot",
            "image_url": "https://ae01.alicdn.com/kf/H21b16fc89a5b4e6c87e9d80ef495b4f1k/Lucu-Marvel-Avangers-Baby-Groot-Action-Figure-Mainan-PVC-Pahlawan-Model-Bayi-Manusia-Pohon-Lucu-Model.jpg",
            "price": 300000,
            "stock": 1,
            "createdAt": "2020-12-09T09:24:14.712Z",
            "updatedAt": "2020-12-09T12:35:27.052Z"
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
access_token : 'token string'
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
  id : 3
}
```
_Response(200)_
```
{
  {
      "id": 3,
      "name": "groot",
      "image_url": "https://ae01.alicdn.com/kf/H21b16fc89a5b4e6c87e9d80ef495b4f1k/Lucu-Marvel-Avangers-Baby-Groot-Action-Figure-Mainan-PVC-Pahlawan-Model-Bayi-Manusia-Pohon-Lucu-Model.jpg",
      "price": 300000,
      "stock": 1,
      "createdAt": "2020-12-09T09:24:14.712Z",
      "updatedAt": "2020-12-09T12:35:27.052Z"
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
access_token : 'token string'
```
_Request Params_
```
id : 3
```
_Request Body_
```
{
  name : 'groot2',
  image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
  price : 20000,
  stock : 20
}
```
_Response(200)_
```
{ 
  id : 3
  name : 'groot2',
  image_url : 'https://ecs7.tokopedia.net/img/cache/900/product-1/2018/5/25/10897244/10897244_f9732383-bd09-4102-b740-75aab701b410_800_800.jpg',
  price : 20000,
  stock : 20
}
```
_Response(404)_
```
{ 
  "message": "product not found"
}
```
_Response(401)_
```
{ 
  "message": "please logoin first"
}
```
_Response(401)_
```
{ 
  "message": "you are not an admin"
}
```
_Response(400)_
```
{ 
  "message": [
    "stock can not lower than 0",
    "price can not lower than 0",
    "stock must be a number",
    "price must be a number"
  ]
}
```
### delete /products/:id
>delete product

_Request Header_
```
access_token : 'token string'
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
_Response(200)_
```
{ 
  "message": "succesfully delete a product"
}
```
_Response(401)_
```
{ 
  "message": "please logoin first"
}
```
_Response(401)_
```
{ 
  "message": "you are not an admin"
}
```