RESTfull API Doc

**Login User**
----
  -

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

  None


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJlZnJpemFsc3kwNDI0QGdtYWlsLmNvbSIsImlhdCI6MTYwNjMwNzYzMn0._6oN91LbjFUQomwt-9QxAcnUzXPY62UFUHKlB2eTeco"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "email is required" }, { "message": "password is required" }, { "message" : "Data is missing/Access Denied" }]`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`

    <!-- --------------------------------------------- -->

**Show All Product**
----
  show all databases belong to user while logged in

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"products": []}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`


**Create Product**
----
  Create belong to user while logged in

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  **Required:**
 
   `name=[string]`
   `image_url=[string]`
   `price=[integer]`
   `stock=[integer]`


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "id": 1, "name": "furniture", "image_url": "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80", "price": 250000, "stock": 10, "UserId": 1, "updatedAt": "2020-12-08T19:16:45.131Z", "createdAt": "2020-12-08T19:16:45.131Z" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "name is required"}, { "message": "image is required"}, { "message": "price is required"}, { "message": "stock is required"}, { "message": "image URL input must be a valid url" }, { "message": "price input must be a valid number" }, { "message": "stock input must be a valid number" }, { "message": "price cannot be a negative value" }, { "message": "stock cannot be a negative value" }]`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



**Get One product**
----
  Show one data belong to user while logged in

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**
 
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "id": 1, "name": "furniture", "image_url": "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80", "price": 250000, "stock": 10, "UserId": 1, "updatedAt": "2020-12-08T19:16:45.131Z", "createdAt": "2020-12-08T19:16:45.131Z" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



**Update product**
----
  Update product data belong to user while logged in

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  **Required:**
 
   `name=[string]`
   `image_url=[string]`
   `price=[integer]`
   `stock=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "id": 1, "name": "furniture", "image_url": "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80", "price": 250000, "stock": 10, "UserId": 1, "updatedAt": "2020-12-08T19:16:45.131Z", "createdAt": "2020-12-08T19:16:45.131Z" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "name is required"}, { "message": "image is required"}, { "message": "price is required"}, { "message": "stock is required"}, { "message": "image URL input must be a valid url" }, { "message": "price input must be a valid number" }, { "message": "stock input must be a valid number" }, { "message": "price cannot be a negative value" }, { "message": "stock cannot be a negative value" }]`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



    **Delete product**
----
  Delete belong to user while logged in

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{message: 'product succes to delete'}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



    <!-- --------------------------------------------- -->

**Show All Banner**
----
  show all databases belong to user while logged in

* **URL**

  /banners

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"banners": []}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`


**Create Banner**
----
  Create belong to user while logged in

* **URL**

  /banners

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  **Required:**
 
   `title=[string]`
   `status=[string]`
   `image_url=[string]`


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "id": 1, "title": "foto", "status": "done, "https://images.unsplash.com/photo-1603744548684-8fde009b7855?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80", "UserId": 1, "updatedAt": "2020-12-08T19:16:45.131Z", "createdAt": "2020-12-08T19:16:45.131Z" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "title is required"}, { "message": "status is required"}, { "message": "image is required"}, { "message": "image URL input must be a valid url" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



**Get One banner**
----
  Show one data belong to user while logged in

* **URL**

  /banners/:id

* **Method:**

  `GET`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**
 
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "id": 1, "title": "foto", "status": "done, "https://images.unsplash.com/photo-1603744548684-8fde009b7855?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80", "UserId": 1, "updatedAt": "2020-12-08T19:16:45.131Z", "createdAt": "2020-12-08T19:16:45.131Z" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



**Update banner**
----
  Update banner data belong to user while logged in

* **URL**

  /banners/:id

* **Method:**

  `PUT`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  **Required:**
 
   `title=[string]`
   `status=[string]`
   `image_url=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "id": 1, "title": "foto", "status": "done, "https://images.unsplash.com/photo-1603744548684-8fde009b7855?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80", "UserId": 1, "updatedAt": "2020-12-08T19:16:45.131Z", "createdAt": "2020-12-08T19:16:45.131Z" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "title is required"}, { "message": "status is required"}, { "message": "image is required"}, { "message": "image URL input must be a valid url" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



    **Delete banner**
----
  Delete belong to user while logged in

* **URL**

  /banners/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

  `id=[integer]`

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  None


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{message: 'banner succes to delete'}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`