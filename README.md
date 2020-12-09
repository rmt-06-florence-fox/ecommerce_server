# ecommerce_server

E-commerce is the activity of electronically buying or selling of products on online services or over the Internet. 

**RESTful Endpoints**
---
- `POST /login/`
- `GET /products/`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

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

    `access_token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzQ4Nzk5OX0.lv-MkL9Fr8E74bgvvmtGkIUFzuyNa4jBtWAQ-UBKoJY`

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

* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```json
    {
        "message": "Please Login First"
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