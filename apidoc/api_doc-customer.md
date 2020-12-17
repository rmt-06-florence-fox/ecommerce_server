# The New Ecommerce App

## **Register Customer**

Register Customer on server.

- **URL**

  /customerRegister

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
    "firstName": "jono",
    "lastName": "tingkir",
    "gender": "male",
    "email": "jono@email.com",
    "role": "customer"
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

  /customerLogin

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
        "email": "jono@email.com",
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


- **GET Products**

> see all the Products

- **URL**

  /products

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


- **Add to Wishlist**

> add product to Wishlist

- **URL**

  /wishlist

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
        "ProductId": 1
    }
]
```

- **_Response (201)_**

```
[
    {
    "id": 5,
    "UserId": 6,
    "ProductId": 1,
    "updatedAt": "2020-12-17T02:57:48.373Z",
    "createdAt": "2020-12-17T02:57:48.373Z"
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

- **GET All Wishlist**

> get all product in Wishlist

- **URL**

  /wishlist

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
        "id": 4,
        "UserId": 6,
        "ProductId": 1,
        "amount": 1,
        "status": "Unpaid",
        "createdAt": "2020-12-17T02:55:06.862Z",
        "updatedAt": "2020-12-17T02:55:06.862Z",
        "Product": {
            "id": 1,
            "name": "Macbook Pro",
            "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-silver-select-202011?wid=892&hei=820&&qlt=80&.v=1603406899000",
            "price": 20000000,
            "stock": 5,
            "CategoryId": 1,
            "createdAt": "2020-12-16T23:01:06.600Z",
            "updatedAt": "2020-12-16T23:01:06.600Z"
        }
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

- **DELETE a Wishlist**

> delete a product in Wishlist

- **URL**

  /wishlist/:id

- **Method:**

  `DELETE`

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
    "deleted wishlist success
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```

----------------------------------------------------------------

- **Add to Cart**

> add product to Cart

- **URL**

  /wishlist

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
        "ProductId": 1
    }
]
```

- **_Response (201)_**

```
[
    {
    "id": 5,
    "UserId": 6,
    "ProductId": 1,
    "updatedAt": "2020-12-17T02:57:48.373Z",
    "createdAt": "2020-12-17T02:57:48.373Z"
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

- **GET All Product in Cart**

> get all product in Cart

- **URL**

  /cart

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
        "id": 4,
        "UserId": 6,
        "ProductId": 1,
        "amount": 1,
        "status": "Unpaid",
        "createdAt": "2020-12-17T02:55:06.862Z",
        "updatedAt": "2020-12-17T02:55:06.862Z",
        "Product": {
            "id": 1,
            "name": "Macbook Pro",
            "image_url": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-silver-select-202011?wid=892&hei=820&&qlt=80&.v=1603406899000",
            "price": 20000000,
            "stock": 5,
            "CategoryId": 1,
            "createdAt": "2020-12-16T23:01:06.600Z",
            "updatedAt": "2020-12-16T23:01:06.600Z"
        }
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

- **DELETE a product in cart**

> delete a product in Wishlist

- **URL**

  /cart/:id

- **Method:**

  `DELETE`

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
    "deleted a product success
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```

----------------------------------------------------------------

- **Checkout product in cart**

> checkout product in Cart

- **URL**

  /cart/:id

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
NONE
```

- **_Response (200)_**

```
[
    "checkout product success
]
```

- **_Response (500 - Internal server error)_**

```
{
  "errors": "internal server error"
}
```
