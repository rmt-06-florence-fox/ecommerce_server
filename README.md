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

  ### Link Heroku :https://fast-reaches-72869.herokuapp.com/