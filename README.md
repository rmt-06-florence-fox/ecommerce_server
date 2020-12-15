
# E-commerce CMS
```
Create E-commerce CMS app, using express, Vue, Vue-cli, axios
* RESTful endpoint for Product List's CRUD operation
* JSON formatted response
* Web Server response
```

# USAGE
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon server.js to start the server.
Run `live-server --host=localhost` to start the client
```

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

### POST/login

>Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "email": "<Admin's email>",
    "password": "<Admin's password>"
}
```

_Response(200)_
```
{
    "access_token": <token>
}
```
_Response(400- bad request)_
```
{
    "message": "Invalid email / password"
}
```


_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

### GET/products

>Get All Product

_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```


 {
    "name": "sepatu",
    "image_url": "www.sepatu.com",
    "price": 1,
    "stock": 3
 }
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```



### POST/products

>Create New Product List

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  "name": "sepatu",
  "image_url": "www.sepatu.com",
  "price": 1,
  "stock": 3
}
```
_Response (201 - Created)_
```
{
  "name": "sepatu",
  "image_url": "www.sepatu.com",
  "price": 1,
  "stock": 3
}
```
_Response(400- bad request)_
```
{
  "msg": "Validation error: Please fill in your product name, 
  Validation error: Please fill in your product image url,
  Validation error: Validation notEmpty Please fill in your product price, 
  Validation error: Validation notEmpty on Please fill in your product stock, 
  Validation error: Validation fieldString on You cannot fill in your product price with string, 
  Validation error: Validation fieldString on You cannot fill in your product stock with string"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
### GET/product/2

>get todo by id
_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```


 {
    "id": 2,
    "name": "sepatu",
    "image_url;": "www.sepatu.com",
    "price": 23333,
    "stock": 3,
    "createdAt": "2020-11-27T14:24:59.702Z",
    "updatedAt": "2020-11-27T16:31:57.412Z",
 }
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```
_Response(404- Not Found)_
```
{
  "message": "id not found"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```




### PUT/todos/:id

>Update Product list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
  "name": "sepatu",
  "image_url;": "www.sepatu.com",
  "price": 23333,
  "stock": 3,
}
```
_Response(200)_
```
{
  "id": 2,
  "name": "sepatu",
  "image_url;": "www.sepatu.com",
  "price": 23333,
  "stock": 3,
  "createdAt": "2020-11-27T14:24:59.702Z",
  "updatedAt": "2020-11-27T16:31:57.412Z",
}
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "Sorry you no Authorized in product"
}
```

_Response(404 - not found)_
```
{
  "message": "id not found"
}
```



_Response(400- bad request)_
```
{
  "msg": "Validation error: Please fill in your product name, 
  Validation error: Please fill in your product image url,
  Validation error: Validation notEmpty Please fill in your product price, 
  Validation error: Validation notEmpty on Please fill in your product stock, 
  Validation error: Validation fieldString on You cannot fill in your product price with string, 
  Validation error: Validation fieldString on You cannot fill in your product stock with string"
}
```
_Response (500)_
```

{
  "message": "Internal Server Error"
}
```

### DELETE/todos/:id

>Delete todos list by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  "message": "delete success"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "Sorry you no Authorized in product"
}
```

_Response(404 - not found)_
```
{
  "message": "id not found"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```