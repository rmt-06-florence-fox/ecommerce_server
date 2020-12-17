# Ecommerce-App
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


---
<br>

**Get Cart**
----
  Get all cart data from a user.

* **URL**

  /cart

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id": 50, "bought": 1, "status": "pending", "total_price": null,"createdAt": "2020-12-17T03:48:59.623Z","updatedAt": "2020-12-17T03:48:59.623Z","UserId": 4, "ProductId": 2, "Product": {"id": 2, "name": "Kacang Panjang","image_url": "https://asset-a.grid.id/crop/0x0:0x0/700x0/photo/2020/02/17/475061753.jpg", "price": 5000, "stock": 2, "createdAt": "2020-12-16T15:24:06.729Z","updatedAt": "2020-12-17T03:05:01.941Z","CategoryId": 1}, "total_invoice": 5000}, ...`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Please login first"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`


---
<br>

**Add Cart**
----
  Add a cart with a user account.

* **URL**

  /cart

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

  `ProductId=[integer] -- by system`

  `bought=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"message": "Data added to cart successful"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Please login first"}`

  OR

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Out of stock"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`


---
<br>

**Delete Cart**
----
  Delete a cart with a user account.

* **URL**

  /cart/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

  `id=[integer]`

   **Required:**

* **Data Params**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message: 'Data removed from cart successful'}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Please login first"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`


---
<br>

**Edit Cart**
----
  Edit a cart with a user account.

* **URL**

  /cart/:id

* **Method:**

  `PUT`
  
*  **URL Params**

  `id=[integer]`

   **Required:**

* **Data Params**

  `access_token=[string]`

  `bought=[integer]`

  `total_price=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id": 50, "bought": 1, "status": "paid", "total_price": total_invoice,"createdAt": "2020-12-17T03:48:59.623Z","updatedAt": "2020-12-17T03:48:59.623Z","UserId": 4, "ProductId": 2, "total_invoice": 5000}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Please login first"}`

  OR

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Out of stock"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`


---
<br>

**User (Customer) Register**
----
  Register to app.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `email=[string] -- format email`

   `password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"id": 7, "email": "contoh4@mail.com", "password": "$2a$10$sSOoD6qypdt9d1zSrVzBwOVp5vwQ8nmih0ARVdJoUXMw32XJaUVii", "role": "customer", "updatedAt": "2020-12-17T04:41:31.633Z","createdAt": "2020-12-17T04:41:31.633Z"}`
 
* **Error Response:**

  * **Code:** 400 UNAUTHORIZED <br />
    **Content:** `{"message": "Email is already exist"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Email & Password is required"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`

---
<br>

**User (Customer) Login**
----
  Login to app as a user customer.

* **URL**

  /signin

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