# kanban-app
**User Login**
----
  Login to app as a user.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `email=[string] -- format email`

   `password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"access_token"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Email / Password is incorrect"}`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"message": "Invalid account"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Email & Password is required"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`
---
<br>

**Get Products**
----
  Get all products.

* **URL**

  /product

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"name": ..., "image_url": ..., "price": ..., "stock": ...}, ...`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Internal Server Error"}`

---
<br>

**Add Product**
----
  Add a product with a account user.

* **URL**

  /product

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `name=[string]`

   `image_url=[text]`

   `price=[integer]`

   `stock=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"name": ..., "image_url": ..., "price": ..., "stock": ...}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Please login first"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "<field> is required"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Stock / price must greater than or equal to 0"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Stock / price must in integer"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Internal Server Error"}`

---
<br>

**Edit Product**
----
  Edit data product.

* **URL**

  /product/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**

* **Data Params**

   `name=[string]`

   `image_url=[text]`

   `price=[integer]`

   `stock=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"name": ..., "image_url": ..., "price": ..., "stock": ...}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Please login first"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": Stock/Price must greater than or equal to 0}`

OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`

---
<br>

**Delete Product**
----
  Delete a data product.

* **URL**

  /product/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

  `ID=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": "Data deleted successful"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Please login first"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`


---
<br>

**Get Product By ID**
----
  Get a data product by ID.

* **URL**

  /product/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"name": ..., "image_url": ..., "price": ..., "stock": ...}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Please login first"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`

