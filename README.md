# ecommerce_server

E-commerce is the activity of electronically buying or selling of products on online services or over the Internet. 

**RESTful Endpoints**
---
- `POST /register/`
- `POST /login/`
- `GET /products/`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /banners/`
- `GET /banners/:id`
- `POST /banners`
- `PUT /banners/:id`
- `DELETE /banners/:id`
- `GET /cart/`
- `POST /cart/:idProduct`
- `PATCH /cart/:idProduct`
- `DELETE /cart/:idProduct`


**Register Account**
---
    Return access_token.

* **URL**

    `/register/`

* **Method:**

    `POST`

* **Header:**

    None

* **URL Params**

    None

* **Data Params**

  **Required:**

    `email=[string]` <br />
    `password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
        "id": 5,
        "email": "taufiq@mail.com"
    }
    ```

* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "email must be unique"
    }
    ```

    OR

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Email is required"
    }
    ```

    OR

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Password must be 6-32 characters"
    }
    ```

    OR

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Password is required"
    }
    ```

**Login Account**
---
    Return access_token.

* **URL**

    `/login/`

* **Method:**

    `POST`

* **Header:**

    None

* **URL Params**

    None

* **Data Params**

  **Required:**

    `email=[string]` <br />
    `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY"
    }
    ```

* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Invalid Account"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Invalid Email/Password"
    }
    ```

**Create Product**
---
    Add Product data to database.

* **URL**

    `/products/:id/`

* **Method:**

    `POST`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY`

* **URL Params**

    None

* **Data Params**

  **Required:**

    `name=[string]` <br />
    `image_url=[string]` <br />
    `price=[integer]` <br />
    `stock=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
        "id": 1,
        "name": "Adidas NMD R1",
        "image_url": "https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg",
        "price": 2600000,
        "stock": 5,
        "updatedAt": "2020-12-09T04:30:01.490Z",
        "createdAt": "2020-12-09T04:30:01.490Z"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "You are not authorized"
    }
    ```

    OR

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Minimum stock is 0"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Minimum price is 0"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Name is required"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Only Number is Allowed"
    }
    ```

**Show Product**
---
    Return json data about Product.

* **URL**

    `/products/`

* **Method:**

    `GET`

* **Header:**

    None

* **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
    "products": 
        [
            {
                "id": 1,
                "name": "Adidas NMD R1",
                "image_url": "https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg",
                "price": 2600000,
                "stock": 5,
                "createdAt": "2020-12-09T04:30:01.490Z",
                "updatedAt": "2020-12-09T04:30:01.490Z"
            },
            {
                "id": 2,
                "name": "Adidas NMD R4",
                "image_url": "https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg",
                "price": 2600000,
                "stock": 5,
                "createdAt": "2020-12-09T04:37:55.659Z",
                "updatedAt": "2020-12-09T04:37:55.659Z"
            }
        ]
    }
    ```

**Find by Id Product**
---
    Show product by selected id.

* **URL**

    `/products/:id`

* **Method:**

    `GET`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY`

* **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "product": {
            "id": 2,
            "name": "Adidas NMD R4",
            "image_url": "https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg",
            "price": 2600000,
            "stock": 5,
            "createdAt": "2020-12-09T04:37:55.659Z",
            "updatedAt": "2020-12-09T04:37:55.659Z"
        }
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```


**Update Product**
---
    Update product.

* **URL**

    `/products/:id`

* **Method:**

    `PUT`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY`

* **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

    **Required:**

    `name=[string]` <br />
    `image_url=[string]` <br />
    `price=[integer]` <br />
    `stock=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "id": 2,
        "name": "Adidas NMD R2",
        "image_url": "https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg",
        "price": 3600000,
        "stock": 3,
        "createdAt": "2020-12-09T04:37:55.659Z",
        "updatedAt": "2020-12-09T04:47:38.262Z"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "You are not authorized"
    }
    ```

    OR

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Minimum price is 0"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Minimum stock is 0"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Only Number is Allowed"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Name is required"
    }
    ```

**Delete Product**
---
    Delete product.

* **URL**

    `/products/:id`

* **Method:**

    `DELETE`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY`

* **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "message": "Product deleted successfuly"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "You are not authorized"
    }
    ```

**Create Banner**
---
    Add Banner data to database.

* **URL**

    `/banners/:id/`

* **Method:**

    `POST`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY`

* **URL Params**

    None

* **Data Params**

  **Required:**

    `title=[string]` <br />
    `status=[string]` <br />
    `image_url=[string]` <br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
        "id": 1,
        "title": "Tokoku",
        "status": "active",
        "image_url": "https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg",
        "updatedAt": "2020-12-12T09:29:29.519Z",
        "createdAt": "2020-12-12T09:29:29.519Z"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "You are not authorized"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Title is required"
    }
    ```

**Show Banner**
---
    Return json data about Banner.

* **URL**

    `/banners/`

* **Method:**

    `GET`

* **Header:**

    None

* **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "banners": 
        [
            {
                "id": 1,
                "title": "Tokoku",
                "status": "active",
                "image_url": "https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg",
                "createdAt": "2020-12-12T09:29:29.519Z",
                "updatedAt": "2020-12-12T09:29:29.519Z"
            },
            {
                "id": 2,
                "title": "TokoSaja",
                "status": "active",
                "image_url": "https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg",
                "createdAt": "2020-12-12T09:30:29.318Z",
                "updatedAt": "2020-12-12T09:30:29.318Z"
            }
        ]
    }
    ```

**Find by Id Banner**
---
    Show banner by selected id.

* **URL**

    `/banners/:id`

* **Method:**

    `GET`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY`

* **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "banner": {
            "id": 2,
            "title": "TokoSaja",
            "status": "active",
            "image_url": "https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg",
            "createdAt": "2020-12-12T09:30:29.318Z",
            "updatedAt": "2020-12-12T09:30:29.318Z"
        }
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```


**Update Banner**
---
    Update banner.

* **URL**

    `/banners/:id`

* **Method:**

    `PUT`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY`

* **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

    **Required:**

    `title=[string]` <br />
    `status=[string]` <br />
    `image_url=[string]` <br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "id": 2,
        "title": "TokoX",
        "status": "active",
        "image_url": "https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2019/10/ecommerce.jpg",
        "createdAt": "2020-12-12T09:30:29.318Z",
        "updatedAt": "2020-12-12T09:32:45.962Z"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "You are not authorized"
    }
    ```
    OR

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Title is required"
    }
    ```

**Delete Banner**
---
    Delete banner.

* **URL**

    `/banners/:id`

* **Method:**

    `DELETE`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY`

* **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "message": "Banner deleted successfuly"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "You are not authorized"
    }
    ```

**Update Or Create Cart Product**
---
    Update or Add Product to Cart.

* **URL**

    `/cart/:idProduct/`

* **Method:**

    `PUT`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0YXVmaWsxQG1haWwuY29tIiwiaWF0IjoxNjA4MDEwOTM4fQ.CYq2hbqgOgnioY5BrIzGbDUcT3YJq0em59cHil0NSn8`

* **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

  **Required:**
    `quantity=[integer]` <br />

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
    {
        "id": 7,
        "UserId": 4,
        "ProductId": 4,
        "quantity": 4,
        "status": false,
        "updatedAt": "2020-12-16T03:41:06.585Z",
        "createdAt": "2020-12-16T03:41:06.585Z"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "invalid token"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Product Quantity is min 1 and max 11"
    }
    ```

    OR 

  * **Code:** 400 Bad Request <br />
    **Content:**
    ```json
    {
        "message": "Sold Out"
    }
    ```

**Show All Cart Product**
---
    Show All Product in Cart.

* **URL**

    `/cart/`

* **Method:**

    `GET`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0YXVmaWsxQG1haWwuY29tIiwiaWF0IjoxNjA4MDEwOTM4fQ.CYq2hbqgOgnioY5BrIzGbDUcT3YJq0em59cHil0NSn8`

* **URL Params**

    **Required:**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "products": [
            {
                "id": 5,
                "UserId": 4,
                "ProductId": 2,
                "quantity": 4,
                "status": false,
                "createdAt": "2020-12-16T03:38:54.718Z",
                "updatedAt": "2020-12-16T03:38:54.718Z",
                "Product": {
                    "id": 2,
                    "name": "Adidas NMD R1",
                    "image_url": "https://assets.adidas.com/images/w_600,f_auto,q_auto/73101ab9d9ee445db281ab57011a0229_9366/NMD_R1_Shoes_Blue_FV1734_01_standard.jpg",
                    "price": 2600000,
                    "stock": 5,
                    "createdAt": "2020-12-15T06:38:57.464Z",
                    "updatedAt": "2020-12-15T06:38:57.464Z"
                }
            },
            {
                "id": 6,
                "UserId": 4,
                "ProductId": 4,
                "quantity": 4,
                "status": false,
                "createdAt": "2020-12-16T03:38:57.108Z",
                "updatedAt": "2020-12-16T03:38:57.108Z",
                "Product": {
                    "id": 4,
                    "name": "Star Wars Mandalorian",
                    "image_url": "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/a28ebb0ea741481d8ca7ac4d00f09a31_9366/Star_Wars_Mandalorian_NMD_R1_Shoes_Brown_GZ2745_01_standard.jpg",
                    "price": 2300000,
                    "stock": 11,
                    "createdAt": "2020-12-15T09:49:41.732Z",
                    "updatedAt": "2020-12-15T09:49:41.732Z"
                }
            }
        ],
        "totalPrice": 19600000
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "invalid token"
    }
    ```

**Remove Cart Product**
---
    Remove Product in Cart.

* **URL**

    `/cart/:idCart/`

* **Method:**

    `DELETE`

* **Header:**

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0YXVmaWsxQG1haWwuY29tIiwiaWF0IjoxNjA4MDEwOTM4fQ.CYq2hbqgOgnioY5BrIzGbDUcT3YJq0em59cHil0NSn8`

* **URL Params**

    **Required:**

    `id=[integer]`

* **Data Params**

  **Required:**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
    {
        "message": "Cart Deleted Successfuly"
    }
    ```

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
    }
    ```

    OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "invalid token"
    }
    ```

    OR

  * **Code:** 404 Not Found <br />
    **Content:**
    ```json
    {
        "message": "Error Not Found"
    }
    ```