# Mozpedia-app

* **URL**
    /login
    
* **Method:**
    `POST`

*  **URL Params**

   **Required:**
    None

*  **HEADERS**
    None


* **Data Params**

```
    {
    "email": "string",
    "password": "string"
    }
```

* **Success Response:**
    *   **Code:** 200 
        **Content:** {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
        }

* **Error Response:**

  * **Code:** 401 
    **Content:** {"message": "invalid account"}

**==========================================================**

* **URL**
    /products
    
* **Method:**
    `POST`

*  **URL Params**

  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }


* **Data Params**
```
    {
    "name": "string",
    "image_url": "string",
    "price": "number",
    "stock": "number",
    }
```


* **Success Response:**
    *   **Code:** 201 
        **Content:** ```json
            {
            "name": "Sandal",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
            "price": "100000",
            "stock": "8",
            "createdAt": "2020-11-23T12:21:44.420Z",
            "updatedAt": "2020-11-23T12:21:44.420Z"
            }
        ```

* **Error Response:**

  * **Code:** 401
    **Content:** {"message": "wrong or empty data input"}

**==========================================================**

* **URL**
    /products/:id
    
* **Method:**
    `PUT`

*  **URL Params**

    **Required:**
    `id=[integer]`
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }


* **Data Params**
```
    {
    "name": "string",
    "image_url": "string",
    "price": "number",
    "stock": "number",
    }
```


* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "name": "Sandal kecil",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
            "price": "80000",
            "stock": "5",
            "createdAt": "2020-11-23T12:21:44.420Z",
            "updatedAt": "2020-11-23T12:21:44.420Z"
            }
        ```

* **Error Response:**

  * **Code:** 406
    **Content:** {"message": "wrong or empty data input"}

**==========================================================**

* **URL**
    /products/:id
    
* **Method:**
    `DELETE`

*  **URL Params**

    **Required:**
    `id=[integer]`
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "message": 'Delete success'
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR

**==========================================================**

* **URL**
    /products
    
* **Method:**
    `GET`

*  **URL Params**

    **Required:**
    
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "name": "Sandal kecil",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
            "price": "80000",
            "stock": "5",
            "createdAt": "2020-11-23T12:21:44.420Z",
            "updatedAt": "2020-11-23T12:21:44.420Z"
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR

**==========================================================**

* **URL**
    /carts
    
* **Method:**
    `GET`

*  **URL Params**

    **Required:**
    
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "id": "1",
            "UserId": "5",
            "ProductId": "2",
            "quantity": "1",
            "status": true,
            "Product": {
                "name": "Sandal kecil",
                "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                "price": "80000",
                "stock": "5"
            },
            "createdAt": "2020-11-23T12:21:44.420Z",
            "updatedAt": "2020-11-23T12:21:44.420Z"
            },
            {
            "id": "2",
            "UserId": "5",
            "ProductId": "4",
            "quantity": "2",
            "status": true,
            "Product": {
                "name": "Topi kecil",
                "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                "price": "62000",
                "stock": "3"
            },
            "createdAt": "2020-11-23T12:21:44.420Z",
            "updatedAt": "2020-11-23T12:21:44.420Z"
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR

**==========================================================**

* **URL**
    /carts/:id
    
* **Method:**
    `POST`

*  **URL Params**

    **Required:**
    `id=[integer]`
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "id": "1",
            "UserId": "5",
            "ProductId": "2",
            "quantity": "1",
            "status": true,
            "createdAt": "2020-11-23T12:21:44.420Z",
            "updatedAt": "2020-11-23T12:21:44.420Z"
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR

**==========================================================**

* **URL**
    /carts/:id
    
* **Method:**
    `DELETE`

*  **URL Params**

    **Required:**
    `id=[integer]`
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "message": 'Delete success'
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR

**==========================================================**

* **URL**
    /carts/:id
    
* **Method:**
    `PATCH`

*  **URL Params**

    **Required:**
    `id=[integer]`
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "message": 'Update success'
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR

**==========================================================**

* **URL**
    /checkout
    
* **Method:**
    `PATCH`

*  **URL Params**

    **Required:**
    `id=[integer]`
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "message": 'Checkout success'
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR

    **==========================================================**

* **URL**
    /wish
    
* **Method:**
    `GET`

*  **URL Params**

    **Required:**
    
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "id": "1",
            "UserId": "5",
            "ProductId": "2",
            "Product": {
                "name": "Sandal kecil",
                "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                "price": "80000",
                "stock": "5"
            },
            "createdAt": "2020-11-23T12:21:44.420Z",
            "updatedAt": "2020-11-23T12:21:44.420Z"
            },
            {
            "id": "2",
            "UserId": "5",
            "ProductId": "4",
            "quantity": "2",
            "Product": {
                "name": "Topi kecil",
                "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-2825131/swallow_swallow-sandal-jepit-original_full03.jpg",
                "price": "62000",
                "stock": "3"
            },
            "createdAt": "2020-11-23T12:21:44.420Z",
            "updatedAt": "2020-11-23T12:21:44.420Z"
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR

    **==========================================================**

* **URL**
    /wish/:id
    
* **Method:**
    `POST`

*  **URL Params**

    **Required:**
    `id=[integer]`
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 201 
        **Content:** ```json
            {
            "id": "1",
            "UserId": "5",
            "ProductId": "2",
            "createdAt": "2020-11-23T12:21:44.420Z",
            "updatedAt": "2020-11-23T12:21:44.420Z"
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR

 * **Code:** 400
    **Content:**  {"message": 'item already taken'}

**==========================================================**

* **URL**
    /wish/:id
    
* **Method:**
    `DELETE`

*  **URL Params**

    **Required:**
    `id=[integer]`
  

*  **HEADERS**
    {
    "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtb3phcnRAbWFpbC5jb20iLCJpYXQiOjE2MDYyMDQ4MjJ9.uNDT6RdhmGOMf0jxd3NpQUjlzjPiMVUow81TCo9-rmc"
    }





* **Success Response:**
    *   **Code:** 200 
        **Content:** ```json
            {
            "message": 'Delete success'
            }
        ```

* **Error Response:**

  * **Code:** 500
    **Content:**  INTERNAL SERVER ERROR