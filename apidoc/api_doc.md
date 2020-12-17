# The New Ecommerce App

## **Register Admin**

Register Admin on server.

- **URL**

  /adminRegister

- **Method:**

  `POST`

- **Request Headers**

  None

- **URL Params**

  None

- **Data Params**

  **Required:**

{
  "firstNamw": "string",
  "lastName": "string",
  "gender": "string",
  "email": "string",
  "role": "string",
}

- **Success Response:**

  - **Code:** 201 OK <br />
    **Content:**
    ```
    {
    "id": 1,
    "firstName": "bima",
    "lastName": "krishna",
    "gender": "male",
    "email": "admin@email.com",
    "role": "admin"
    }   
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

---

## **Login Admin**

Login Admin on server.

- **URL**

  /adminLogin

- **Method:**

  `POST`

- **Request Headers**

  None

- **URL Params**

  None

- **Data Params**

  **Required:**

  {
    "email": "string",
    "password": "string",
  }

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```
    {
        "email": "admin@email.com",
        "token": "your token"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

---

## **Add Product**

Add Product.

- **URL**

  /products

- **Method:**

  `POST`

- **Request Headers**

  ```
  {
   "token": "<your token>"
  }
  ```

- **_Request Body_**
[
    {
        "name": "Sendal",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/1/41541024/41541024_89995291-bf2b-477d-86b2-eb01e240f465_822_822.jpg",
        "price": 15000,
        "stock": 1
        "CategoryId": 3
    }
]

- **Success Response:**

  - **Code:** 201 OK <br />
    **Content:**
    ```
    [
    {
        "id": 10,
        "name": "sendal",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/1/41541024/41541024_89995291-bf2b-477d-86b2-eb01e240f465_822_822.jpg",
        "stock": 1,
        "price": 15000,
        "CategoryId": 3,
        "updatedAt": "2020-12-17T02:26:18.599Z",
        "createdAt": "2020-12-17T02:26:18.599Z"
    }
]
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

---

- **GET Products**

> see all the Products

- **URL**

  /products

- **Method:**

  `GET`

- **_Request Header_**

```
{
      "token": "<your token>"
}

```

- **_Request Body_**

```
NONE
```

- **_Response (200)_**

```
[
    {
        "id": 9,
        "name": "Jeans levis",
        "image_url": "https://img2.pngdownload.id/20180928/sau/kisspng-jeans-clothing-levis-5-1-levi-strauss-co-shopp-french-cutting-denim-pantsb-size-sml-5bae70c0c90b22.9440963715381587848235.jpg",
        "price": 98000000,
        "stock": 8,
        "CategoryId": 3,
        "createdAt": "2020-12-16T23:01:06.600Z",
        "updatedAt": "2020-12-16T23:01:06.600Z"
    },
    {
        "id": 5,
        "name": "Nike Air Jordan 1",
        "image_url": "https://www.pngfind.com/pngs/m/292-2924335_air-jordan-1-retro-high-og-bred-toe.png",
        "price": 2100000,
        "stock": 8,
        "CategoryId": 2,
        "createdAt": "2020-12-16T23:01:06.600Z",
        "updatedAt": "2020-12-16T23:05:51.227Z"
    },
    {
        "id": 10,
        "name": "sendal",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/1/41541024/41541024_89995291-bf2b-477d-86b2-eb01e240f465_822_822.jpg",
        "price": 18000000,
        "stock": 1,
        "CategoryId": 3,
        "createdAt": "2020-12-17T02:26:18.599Z",
        "updatedAt": "2020-12-17T02:26:18.599Z"
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```

----------------------------------------------------------------

- **EDIT Product by id**

> Edit a specific Product by id

- **URL**

  /products/:id

- **Method:**

  `PUT`

- **_Request Header_**

```
{
  "token": "<your token>"
}
```

- **_Request Body_**
[
    {
        "id": 10,
        "name": "sendal",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/1/41541024/41541024_89995291-bf2b-477d-86b2-eb01e240f465_822_822.jpg",
        "price": 18000000,
        "stock": 1,
        "CategoryId": 3,
        "createdAt": "2020-12-17T02:26:18.599Z",
        "updatedAt": "2020-12-17T02:26:18.599Z"
    }
]
```

- **_Response (200)_**
[
    {
        "id": 10,
        "name": "Sepatu",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/1/41541024/41541024_89995291-bf2b-477d-86b2-eb01e240f465_822_822.jpg",
        "price": 250000,
        "stock": 1,
        "CategoryId": 3,
        "createdAt": "2020-12-17T02:26:18.599Z",
        "updatedAt": "2020-12-17T02:31:32.577Z"
    }
]

```

- **_Response (404 - Not Found)_**

```
{
  "errors": "Product not found"
}
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```

----------------------------------------------------------------

## **DELETE Product **

delete a Product.

- **URL**

  /products/:id

- **Method:**

  `DELETE`

- **Request Headers**

{
  "token": "<your token>"
}

- **URL Params**

  None

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:**
    {
    "deleted success"
    }

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Task not Found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

---

-----------------BANNER----------------

- **GET Banner**

> see all the Banners

- **URL**

  /banners

- **Method:**

  `GET`

- **_Request Header_**

```
NONE
```

- **_Request Body_**

```
NONE
```

- **_Response (200)_**

```
[
    {
        "id": 1,
        "title": "Nike",
        "status": "Active",
        "image_url": "https://i.pinimg.com/originals/bd/60/ab/bd60ab553206e3b5e785de47b458ad06.png",
        "createdAt": "2020-12-16T23:01:06.606Z",
        "updatedAt": "2020-12-16T23:01:06.606Z"
    },
    {
        "id": 2,
        "title": "Apple",
        "status": "Active",
        "image_url": "https://img10.jd.id/Indonesia/nHBfsgAAdwAAABgAAUEw_AAF4gQ.png",
        "createdAt": "2020-12-16T23:01:06.606Z",
        "updatedAt": "2020-12-16T23:01:06.606Z"
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```


- **ADD Banner**

> Add Banner

- **URL**

  /banners

- **Method:**

  `POST`

- **_Request Header_**

```
{
  "token": "<your token>"
}

```

- **_Request Body_**

```
[
    {
        "title": "Iklan Denim",
        "status": "Inactive",
        "image_url": "https://i.pinimg.com/originals/46/12/e6/4612e6f2ac6ab30f489dc43eb9d7ba4f.jpg"
    }
]

```

- **_Response (200)_**

```
[
    {
        "id": 3,
        "title": "Iklan Denim",
        "status": "Inactive",
        "image_url": "https://i.pinimg.com/originals/46/12/e6/4612e6f2ac6ab30f489dc43eb9d7ba4f.jpg",
        "createdAt": "2020-12-16T23:01:06.606Z",
        "updatedAt": "2020-12-16T23:01:06.606Z"
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
````



```

- **Edit Banner**


- **URL**

  /banners/:id


- **Method:**

  `PUT`


- **_Request Header_**

```
{
  "token": "<your token>"
}

```

- **_Request Body_**

```
[
    {
        "id": 3,
        "title": "Iklan celana Denim",
        "status": "Inactive",
        "image_url": "https://i.pinimg.com/originals/46/12/e6/4612e6f2ac6ab30f489dc43eb9d7ba4f.jpg",
    }
]

```

- **_Response (200)_**

```
[
    {
        "id": 3,
        "title": "Iklan celana Denim",
        "status": "Inactive",
        "image_url": "https://i.pinimg.com/originals/46/12/e6/4612e6f2ac6ab30f489dc43eb9d7ba4f.jpg",
    }
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```



- **Edit Banner Status**


- **URL**

  /banners/:id


- **Method:**

  `PATCH`


- **_Request Header_**

```
{
  "token": "<your token>"
}

```
- **_Request Body_**

```
[
    {
        "id": 3,
        "title": "Iklan celana Denim",
        "status": "Inactive",
        "image_url": "https://i.pinimg.com/originals/46/12/e6/4612e6f2ac6ab30f489dc43eb9d7ba4f.jpg"
    }
]

```

- **_Response (200)_**

```
[
    {
        "id": 3,
        "title": "Iklan celana Denim",
        "status": "Active",
        "image_url": "https://i.pinimg.com/originals/46/12/e6/4612e6f2ac6ab30f489dc43eb9d7ba4f.jpg",
        "createdAt": "2020-12-16T23:01:06.606Z",
        "updatedAt": "2020-12-16T23:01:06.606Z"
    }
]
```

- **_Response (500 - Internal server error)_**

{
  "errors": "internal server error"
}



## **DELETE Banner **

delete a Banner.

- **URL**

  /banners/:id

- **Method:**

  `DELETE`

- **Request Headers**

{
  "token": "<your token>"
}

- **URL Params**

  None

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:**
    {
    "deleted success"
    }

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Banner not Found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

---


------------------CATEGORY---------------

- **ADD Category**

> Add Category

- **URL**

  /categories

- **Method:**

  `POST`

- **_Request Header_**

```
{
  "token": "<your token>"
}

```

- **_Request Body_**

```
[
    {
        name : elektronik
    }
]

```

- **_Response (200)_**

```
[
    {
    "id": 4,
    "name": elektronik,
    "updatedAt": "2020-12-17T02:47:12.905Z",
    "createdAt": "2020-12-17T02:47:12.905Z"
}
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}



```
## **DELETE Category **

delete a Category.

- **URL**

  /categories/:id

- **Method:**

  `DELETE`

- **Request Headers**

{
  "token": "<your token>"
}

- **URL Params**

  None

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:**
    {
    "deleted success"
    }

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Category not Found" }`

  OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`
