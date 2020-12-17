# ecommerce_server

## Demo App
* [Client-Customer](https://jarooda-ecommerce-customer.web.app/)
* [Client-CMS](https://jarooda-ecommerce-cms.web.app/)
* [Server](https://jarooda-db-ecommerce.herokuapp.com/)

## Api Documentation
* [Postman](https://documenter.getpostman.com/view/13590441/TVsoFVJQ)

**User Admin - Login**
---
* **URL**

    /login/admin

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    **Required:**
 
    `email=[string]`<br />
    `password=[string]`


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3ODMwN30.TEsFEjkUdmnyGwaZAFbtyrh9SWMMq-mryPv4jJTS8u0"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Wrong Email / Password"}`

    OR

    * **Code:** 403 Forbidden <br />
    **Content:** `{"message": "You didn't have an access to this panel"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`

**User Customer - Login**
---
* **URL**

    /login/customer

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    **Required:**
 
    `email=[string]`<br />
    `password=[string]`


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc3ODMwN30.TEsFEjkUdmnyGwaZAFbtyrh9SWMMq-mryPv4jJTS8u0"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Wrong Email / Password"}`

    OR

    * **Code:** 403 Forbidden <br />
    **Content:** `{"message": "Admin Account Cannot Be Used In Customer Side"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`

**User Customer - Register**
---
* **URL**

    /register

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    **Required:**
 
    `email=[string]`<br />
    `password=[string]`


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      "id": 2,
      "email": "contoh@mail.com"
    }
    ```
 
* **Error Response:**

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Password Min 6 Characters, Email Invalid, Email Required, Password Required"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`

**Products - Fetch All Data**
---
* **URL**

    /products

* **Method:**

    `GET`
  
*  **URL Params**

    None

* **Data Params**

    None


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        "products": [
          {
            "id": 1,
            "name": "Keyboard Logitech K380",
            "image_url": "https://www.mombasacomputers.com/wp-content/uploads/2020/07/Logitech-K380-Wireless-Multi-Device-Keyboard-1.png",
            "price": 100000,
            "stock": 5,
            "CategoryId": 4,
            "createdAt": "2020-12-12T03:46:59.661Z",
            "updatedAt": "2020-12-12T03:46:59.661Z",
            "Category": {
              "id": 4,
              "name": "Keyboard",
              "image": "keyboard",
              "createdAt": "2020-12-12T03:46:59.657Z",
              "updatedAt": "2020-12-12T03:46:59.657Z"
            }
          },
          {
            "id": 2,
            "name": "Mouse Logitech B100",
            "image_url": "https://www.jakartanotebook.com/images/products/40/67/7435/2/logitech-wired-mouse-b100-black-3.jpg",
            "price": 70000,
            "stock": 4,
            "CategoryId": 1,
            "createdAt": "2020-12-12T03:46:59.661Z",
            "updatedAt": "2020-12-12T03:46:59.661Z",
            "Category": {
              "id": 1,
              "name": "Mouse",
              "image": "mouse",
              "createdAt": "2020-12-12T03:46:59.657Z",
              "updatedAt": "2020-12-12T03:46:59.657Z"
            }
          },
          {
            "id": 3,
            "name": "Printer Epson L3110",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-2669479/epson_epson-l3110-ecotank-multifungsi-printer--print--scan--copy-_full05.jpg",
            "price": 2500000,
            "stock": 7,
            "CategoryId": 2,
            "createdAt": "2020-12-12T03:46:59.661Z",
            "updatedAt": "2020-12-12T03:46:59.661Z",
            "Category": {
              "id": 2,
              "name": "Printer",
              "image": "print",
              "createdAt": "2020-12-12T03:46:59.657Z",
              "updatedAt": "2020-12-12T03:46:59.657Z"
            }
          },
          {
            "id": 4,
            "name": "Aspire 3 A314-32",
            "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/Acer_Aspire_3_A314_32_ID/Acer_Aspire_3_A314_32_ID_L_1.jpg",
            "price": 4999999,
            "stock": 10,
            "CategoryId": 3,
            "createdAt": "2020-12-12T03:46:59.661Z",
            "updatedAt": "2020-12-12T03:46:59.661Z",
            "Category": {
              "id": 3,
              "name": "Laptop",
              "image": "laptop",
              "createdAt": "2020-12-12T03:46:59.657Z",
              "updatedAt": "2020-12-12T03:46:59.657Z"
            }
          },
          {
            "id": 23,
            "name": "Jalu",
            "image_url": "czxz",
            "price": 123123,
            "stock": 0,
            "CategoryId": 15,
            "createdAt": "2020-12-12T09:25:41.016Z",
            "updatedAt": "2020-12-12T11:34:36.350Z",
            "Category": {
              "id": 15,
              "name": "Water",
              "image": "water",
              "createdAt": "2020-12-12T09:25:24.725Z",
              "updatedAt": "2020-12-12T09:25:24.725Z"
            }
          }
        ]
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`


**Products - Fetch One Data**
---
* **URL**

    /products/:id

* **Method:**

    `GET`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    None


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        "product": {
            "id": 2,
            "name": "Mouse Logitech B100",
            "image_url": "https://www.jakartanotebook.com/images/products/40/67/7435/2/logitech-wired-mouse-b100-black-3.jpg",
            "price": 70000,
            "stock": 4,
            "CategoryId": 1,
            "createdAt": "2020-12-12T03:46:59.661Z",
            "updatedAt": "2020-12-12T03:46:59.661Z",
            "Category": {
              "id": 1,
              "name": "Mouse",
              "image": "mouse",
              "createdAt": "2020-12-12T03:46:59.657Z",
              "updatedAt": "2020-12-12T03:46:59.657Z"
            }
          }
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 404 Not Found <br />
    **Content:** `{"message": "Error Not Found"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`


**Products - Add Data**
---
* **URL**

    /products

* **Method:**

    `POST`
  
*  **URL Params**

    None

* **Data Params**

    **Required:**
 
    `access_token=[string]`

    **Required Body:**

    `name=[string]`<br />
    `image_url=[string]`<br />
    `price=[integer]`<br />
    `stock=[integer]`<br />
    `CategoryId=[integer]`


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        "product": {
          "id": 10,
          "name": "Stardust",
          "image_url": "http://demo.st-marron.info/roulette/sample/star.png",
          "price": 10000,
          "stock": 10,
          "CategoryId": 1,
          "updatedAt": "2020-12-12T13:15:16.069Z",
          "createdAt": "2020-12-12T13:15:16.069Z"
        }
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Product Name Required"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Price Must Be a Number"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Price Minimum Rp. 1,-"}`
    
    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Stock Minimum 0"}`
    
    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Stock Must Be a Number"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Product Category Required"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`


**Products - Edit Data**
---
* **URL**

    /products/:id

* **Method:**

    `PUT`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    **Required:**
 
    `access_token=[string]`

    **Required Body:**

    `name=[string]`<br />
    `image_url=[string]`<br />
    `price=[integer]`<br />
    `stock=[integer]`<br />
    `CategoryId=[integer]`


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        "product": {
          "id": 10,
          "name": "Blablabla",
          "image_url": "http://demo.st-marron.info/roulette/sample/star.png",
          "price": 10,
          "stock": 1,
          "CategoryId": 1,
          "updatedAt": "2020-12-12T13:50:16.069Z",
          "createdAt": "2020-12-12T13:15:16.069Z"
        }
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Product Name Required"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Price Must Be a Number"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Price Minimum Rp. 1,-"}`
    
    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Stock Minimum 0"}`
    
    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Stock Must Be a Number"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Product Category Required"}`
    
    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`

**Products - Edit Data**
---
* **URL**

    /products/:id

* **Method:**

    `DELETE`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    **Required:**
 
    `access_token=[string]`

    **Required Body:**

    None


* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { 
        "message": "Product Deleted Successfully"
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`

**Cart - Add Product to Cart (If post again will add 1 product)**
---
* **URL**

    /cart/:ProductId

* **Method:**

    `POST`
  
*  **URL Params**

    `ProductId=[integer]`

* **Data Params**

    **Required:**
 
    `access_token=[string]`

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      "cart": {
        "id": 1,
        "TransactionId": 1,
        "ProductId": 1,
        "quantity": 1,
        "total": 100000,
        "updatedAt": "2020-12-17T05:17:55.894Z",
        "createdAt": "2020-12-17T05:17:55.894Z"
      }
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 404 Not Found <br />
    **Content:** `{"message": "Error Not Found"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`

**Cart - Edit Quantity in Cart**
---
* **URL**

    /cart/:id

* **Method:**

    `PUT`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    **Required:**
 
    `access_token=[string]`

    **Required Body:**
 
    `quantity=[integer]`

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      "cart": {
        "id": 1,
        "TransactionId": 1,
        "ProductId": 1,
        "quantity": 1,
        "total": 100000,
        "createdAt": "2020-12-17T05:17:55.894Z",
        "updatedAt": "2020-12-17T05:22:53.347Z"
      }
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 404 Not Found <br />
    **Content:** `{"message": "Error Not Found"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`

**Cart - Delete Cart**
---
* **URL**

    /cart/:id

* **Method:**

    `GET`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    **Required:**
 
    `access_token=[string]`

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      "message" : "This product deleted successfully from the cart"
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 404 Not Found <br />
    **Content:** `{"message": "Error Not Found"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`

**Transaction - Get All Cart & Uncompleted Transaction**
---
* **URL**

    /transaction

* **Method:**

    `GET`
  
*  **URL Params**

    None

* **Data Params**

    **Required:**
 
    `access_token=[string]`

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      "transaction": {
        "id": 1,
        "status": "uncompleted",
        "UserId": 2,
        "history": null,
        "total": 0,
        "createdAt": "2020-12-17T04:56:54.694Z",
        "updatedAt": "2020-12-17T04:56:54.694Z",
        "Products": [
          {
            "id": 1,
            "name": "Keyboard Logitech K380",
            "image_url": "https://www.mombasacomputers.com/wp-content/uploads/2020/07/Logitech-K380-Wireless-Multi-Device-Keyboard-1.png",
            "price": 100000,
            "stock": 5,
            "CategoryId": 4,
            "createdAt": "2020-12-17T04:14:43.259Z",
            "updatedAt": "2020-12-17T04:14:43.259Z",
            "Cart": {
              "id": 1,
              "TransactionId": 1,
              "ProductId": 1,
              "quantity": 2,
              "total": 200000,
              "createdAt": "2020-12-17T05:17:55.894Z",
              "updatedAt": "2020-12-17T05:18:11.953Z"
            }
          }
        ]
      }
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`


**Transaction - Clear Transaction**
---
* **URL**

    /transaction/:id

* **Method:**

    `DELETE`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    **Required:**
 
    `access_token=[string]`

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      "message": "Cart has been cleared"
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 404 Not Found <br />
    **Content:** `{"message": "Error Not Found"}`


    OR

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Cannot Edit / Delete Completed Status"}`

    OR

    * **Code:** 403 Forbidden <br />
    **Content:** `{"message": "Cannot edit others transaction"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`


  **Transaction - Checkout Transaction**
---
* **URL**

    /transaction/:id

* **Method:**

    `PUT`
  
*  **URL Params**

    `id=[integer]`

* **Data Params**

    **Required:**
 
    `access_token=[string]`

* **Success Response:**

    * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      "message": "Checkout Successfully"
    }
    ```
 
* **Error Response:**

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Please Login First"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Cannot checkout if the quantity is more than product(s) stock, please double check your cart and the product(s) stock again"}`

    OR

    * **Code:** 400 Bad Request <br />
    **Content:** `{"message": "Cannot checkout empty cart"}`

    OR

    * **Code:** 404 Not Found <br />
    **Content:** `{"message": "Error Not Found"}`


    OR

    * **Code:** 401 Unauthorized <br />
    **Content:** `{"message": "Cannot Edit / Delete Completed Status"}`

    OR

    * **Code:** 403 Forbidden <br />
    **Content:** `{"message": "Cannot edit others transaction"}`

    OR

    * **Code:** 403 Forbidden <br />
    **Content:** `{"message": "Cannot checkout others cart"}`

    OR

    * **Code:** 500 Internal Server Error <br />
    **Content:** `{"message": "Internal Server Error"}`