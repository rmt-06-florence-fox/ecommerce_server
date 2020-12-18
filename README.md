# ecommerce_server


## 1.User Login
* URL
  /users/login

* Method
 `POST`

* URL Params
  None

* Data Params

```
  email: "email"
  password: "password"


```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  
    access_token : "access_token"
    userLogin: "email"
  
  ```

* Error Response
  code: `400 Bad Request`
  content:
  ```
  
    msg: "Wrong email/password"
  
  ```

  code: `400 Bad Request`
  content:
  ```
  
    msg: "Wrong email/password"
  
  ```

  code: `500 Internal Server Error`
  content:
  ```
  {
    msg: `Internal server error`
  }
  ```



## 2. Create Product
* URL
  /products/

* Method
 `POST`

* URL Params
  None

* Data Params
```
  name: "name",
  image_url: "image_url",
  price: "price",
  stock: "stock",
  category: "category"


  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  name: "name",
  image_url: "image_url",
  price: "price",
  stock: "stock",
  category: "category"

  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 3. Get All Product
* URL
  /products/

* Method
 `GET`

* URL Params
  None

* Data Params
```
none

headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  name: "name",
  image_url: "image_url",
  price: "price",
  stock: "stock",
  category: "category"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```

## 4. Product Category Filter
* URL
  /products/category/

* Method
 `GET`

* URL Params
```

category: "category"

```

* Data Params
```

headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  name: "name",
  image_url: "image_url",
  price: "price",
  stock: "stock",
  category: "category"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```


## 5. Get Product by Id
* URL
  /products/:id

* Method
 `GET`

* URL Params
  
```
id: "id"

```

* Data Params

```

headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  name: "name",
  image_url: "image_url",
  price: "price",
  stock: "stock",
  category: "category"
  ```

* Error Response

  code: `400 Bad Request`
  content:
  ```
  
    msg: "product unavailable"
  
  ```

  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 6. Edit Products by Id
* URL
  /products/:id

* Method
 `PUT`

* URL Params
```
id: "id"

```

* Data Params

```

  name: "name",
  image_url: "image_url",
  price: "price",
  stock: "stock",
  category: "category"

  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  name: "name",
  image_url: "image_url",
  price: "price",
  stock: "stock",
  category: "category"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```

  
## 7. Delete Products
* URL
  /products/:id

* Method
 `DELETE`

* URL Params


```
id: "id"
```
* Data Params

```


  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  product: "Product is deleted
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```

  ## 8. Create Banner
* URL
  /banners/

* Method
 `POST`

* URL Params
  None

* Data Params
```
  title: "title",
  status: "status",
  image_url: "image_url"


  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  title: "title",
  status: "status",
  image_url: "image_url"

  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 9. Get All Banner
* URL
  /banners/

* Method
 `GET`

* URL Params
  None

* Data Params
```
none

headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  title: "title",
  status: "status",
  image_url: "image_url"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```


## 10. Get Banner by Id
* URL
  /banners/:id

* Method
 `GET`

* URL Params
  
```
id: "id"

```

* Data Params

```

headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  title: "title",
  status: "status",
  image_url: "image_url"
  ```

* Error Response

  code: `400 Bad Request`
  content:
  ```
  
    msg: "banner unavailable"
  
  ```

  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 11. Edit Banner by Id
* URL
  /banners/:id

* Method
 `PUT`

* URL Params
```
id: "id"

```

* Data Params

```

  title: "title",
  status: "status",
  image_url: "image_url"

  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  title: "title",
  status: "status",
  image_url: "image_url"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```

  
## 12. Delete Banners
* URL
  /banners/:id

* Method
 `DELETE`

* URL Params


```
id: "id"
```
* Data Params

```


  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  product: "Banner is deleted
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```

   ## 13. Get Carts
* URL
  /carts/

* Method
 `GET`

* URL Params
  None

* Data Params
```
  none


  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  totalPrice: "totalPrice",
  status: "status",
  UserId: "UserId",
  CartLists: [
    {
      ProductId: "ProductId",
      CartId: "CartId",
      quantity: "quantity",
      price: "price",
      Product: {
        name: "name",
        image_url: "image_url",
        price: "price",
        stock: "stock",
        UserId: "UserId",
        category: "category"
      }
    }
  ]

  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 14. Add Cart
* URL
  /carts/addCart

* Method
 `POST`

* URL Params
  None

* Data Params
```
UserId: "UserId",
status: "status"

headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  CartList: "CartList",
  Product: "Product"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```


## 15. Delete Cart
* URL
  /carts/:id

* Method
 `DELETE`

* URL Params
  
```
id: "id"

```

* Data Params

```

headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  "Cart is deleted
  ```

* Error Response


  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 16. Edit Cart by Id
* URL
  /carts/editcart/:id

* Method
 `PUT`

* URL Params
```
status: "status",
ProductId: "ProductId",
UserId: "UserId"

```

* Data Params

```

  quantity: "quantity"

  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  quantity: "quantity"
  ```

* Error Response

  code: `400 Bad Request`
  content: 
  ```
    msg: "Can't add anymore product"

  ```
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 17. Get products from customer

* URL
  /customers/

* Method
 `GET`

* URL Params
  None

* Data Params
```
  id: "id"


  headers:{access_token}

```

* Success Response
  Code: `201 Created`
  Content: 
  ```
  name: "name",
  image_url: "image_url",
  price: "price",
  stock: "stock",
  category: "category"

  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```
## 18. Register customers
* URL
  /customers/register

* Method
 `POST`

* URL Params
  None

* Data Params
```
Email: "Email",
Password: "Password",
Role: "Customer"

headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  Id: "Id",
  Email: "Email"
  ```

* Error Response
  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```


## 19. Login Customer
* URL
  /customers/login

* Method
 `POST`

* URL Params
  
  none

* Data Params

```
Email: "Email",
Password: "Password",
Role: "Customer"


headers:{access_token}

```

* Success Response
  Code: `200 OK`
  Content: 
  ```
  access_token: "access_token"
  ```

* Error Response

  code: `400 Bad Request`
  content:
  ```
  
    msg: "wrong email/password"
  
  ```

  code: `400 Bad Request`
  content:
  ```
  
    msg: "wrong email/password"
  
  ```

  code: `401 Unauthorized`
  content:
  ```
  
    msg: "Unauthorized"
  
  ```

  code: `500 Internal Server Error`
  content:
  ```
  
    msg: "Internal Server Error"
  
  ```


  ### Link Heroku :https://fast-reaches-72869.herokuapp.com/