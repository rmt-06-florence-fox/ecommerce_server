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

  * **Code:** 401 <br />
    **Content:** `{ "message": "Invalid Account" }, { "message": "Invalid email/password" }`


  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`

    <!-- --------------------------------------------- -->

**Show All product**
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
 
  None

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


**Create product**
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

  /products/:productId

* **Method:**

  `GET`
  
*  **URL Params**

  `productId=[integer]`

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

  /products/:productIdd

* **Method:**

  `PUT`
  
*  **URL Params**

  `productId=[integer]`

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

  /products/:productId

* **Method:**

  `DELETE`
  
*  **URL Params**

  `productId=[integer]`

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

  /banners/:bannertId

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

  /banners/:bannertId
* **Method:**

  `PUT`
  
*  **URL Params**

  `bannertId=[integer]`

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

  /banners/:bannertId

* **Method:**

  `DELETE`
  
*  **URL Params**

  `bannertId=[integer]`

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

<!-- ---------------------------------------------------------- -->

**Login Customer**
----
  -

* **URL**

  /customers/login

* **Method:**

  `POST`
  
*  **URL Params**

  None


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJlZnJpemFsc3kwNDI0QGdtYWlsLmNvbSIsImlhdCI6MTYwNjMwNzYzMn0._6oN91LbjFUQomwt-9QxAcnUzXPY62UFUHKlB2eTeco", "email":"customer@gmail.com" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "email is required" }, { "message": "password is required" }, { "message" : "Data is missing/Access Denied" }]`

  OR

  * **Code:** 401 <br />
    **Content:** `{ "message": "Invalid Account" }, { "message": "Invalid email/password" }`


  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`


**Register Customer**
----
  -

* **URL**

  /customers/register

* **Method:**

  `POST`
  
*  **URL Params**

  None


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{"email":"customer@gmail.com", password: 123 }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "email is required" }, { "message": "password is required" }, { "message" : "Data is missing/Access Denied" }, { "message": "email is already used" }, { "message": "input must be a valid email" }]`

  OR

  * **Code:** 401 <br />
    **Content:** `{ "message": "Invalid Account" }, { "message": "Invalid email/password" }`


  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



**Show Cart**
----
  -

* **URL**

  /carts

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  **Required:**
 
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `
    `
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `[{ "message": "email is required" }, { "message": "password is required" }, { "message" : "Data is missing/Access Denied" }, { "message": "email is already used" }, { "message": "input must be a valid email" }]`

  OR

  * **Code:** 401 <br />
    **Content:** `{ "message": "Invalid Account" }, { "message": "Invalid email/password" }`


  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`



**Show All cart**
----
  show all databases belong to user while logged in

* **URL**

  /carts

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Header Params**

  **Required:**
 
  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{
    "carts": [
        {
            "id": 2,
            "ProductId": 1,
            "CustomerId": 1,
            "quantity": 34,
            "status": "unpaid",
            "createdAt": "2020-12-15T08:26:58.292Z",
            "updatedAt": "2020-12-16T22:35:58.867Z",
            "Product": {
                "id": 1,
                "name": "furniture",
                "image_url": "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                "price": 250000,
                "stock": 100,
                "UserId": 1,
                "createdAt": "2020-12-15T08:26:37.545Z",
                "updatedAt": "2020-12-15T08:26:37.545Z"
            }
        },
        {
            "id": 6,
            "ProductId": 3,
            "CustomerId": 1,
            "quantity": 11,
            "status": "unpaid",
            "createdAt": "2020-12-16T21:40:00.312Z",
            "updatedAt": "2020-12-16T22:35:58.878Z",
            "Product": {
                "id": 3,
                "name": "furniture3",
                "image_url": "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                "price": 250000,
                "stock": 10,
                "UserId": 1,
                "createdAt": "2020-12-16T15:16:10.611Z",
                "updatedAt": "2020-12-16T15:16:10.611Z"
            }
        },
        {
            "id": 7,
            "ProductId": 2,
            "CustomerId": 1,
            "quantity": 5,
            "status": "unpaid",
            "createdAt": "2020-12-16T23:45:45.477Z",
            "updatedAt": "2020-12-16T23:45:45.477Z",
            "Product": {
                "id": 2,
                "name": "furniture2",
                "image_url": "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
                "price": 250000,
                "stock": 100,
                "UserId": 1,
                "createdAt": "2020-12-15T08:41:37.190Z",
                "updatedAt": "2020-12-15T08:41:37.190Z"
            }
        }
    ],
    "total": 12500000
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message": "Data is missing/Access Denied" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Access denied, please login first" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ "message": "Internal server error" }`


**Create cart**
----
  Create belong to user while logged in

* **URL**

  /carts

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Header Params**

  **Required:**
 
   `access_token=[string]`


* **Data Params**

  **Required:**
 
   `quantity=[integer]`


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{
    "id": 7,
    "ProductId": 2,
    "CustomerId": 1,
    "quantity": 5,
    "status": "unpaid",
    "updatedAt": "2020-12-16T23:45:45.477Z",
    "createdAt": "2020-12-16T23:45:45.477Z"
}`
 
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

  /carts/:id

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
    **Content:** `{message: 'cart succes to delete'}`
 
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
