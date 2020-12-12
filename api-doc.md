**Register User**
----
  Returns json data about a single user that has been created.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   

* **Data Params**

   `email=[string]`
   `password=string`
   `role=string`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
      {
         "data": {
            "id": 10,
            "email": "test100@gmail.com",
            "role":"admin",
      }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
      ```json 
         {
            "message": "Email Already In Use!"
         }
      ```
      OR
      ```json
         {
            "message": "Password must be at least 6 characters"
         }
      ```

  OR

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:**
      ```json
         {
            "message":"Server Error"
         }
      ```




**Login User**
----
  Returns json data of an access token and userId.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   

* **Data Params**

   `email=[string]`
   `password=string`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
      {
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoidGVzdDEwMEBnbWFpbC5jb20iLCJpYXQiOjE2MDcwODg0ODd9.1lCnIyabNMOnkKxZhNWbL0E3L8wTUyx4ZZlYrDxPzEw",
      }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
      ```json 
         {
            "message": "Wrong email/password"
         }
      ```
      OR
      ```json
         {
            "message": "Password must be at least 6 characters"
         }
      ```
      OR

      ```json
         {
            "message": "Email/Password must be filled"
         }
      ```

  OR

  * **Code:** 500 <br />
    **Content:**
      ```json
         {
            "message":"Server Error"
         }
      ```







**Fetch Products**
----
  Returns json data of all tasks.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 

* **Headers**
   **Required:**
   `access_token=[string]`

* **Data Params**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
      {  
         "data": [
            {
                  "id": 4,
                  "name": "product1",
                  "image_url": "https://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL-770x503.jpg",
                  "price":24000,
                  "stock":25,
                  "createdAt": "2020-12-01T06:10:32.375Z",
                  "updatedAt": "2020-12-01T06:10:32.375Z"
            },
            {
                  "id": 5,
                  "name": "product2",
                  "image_url": "https://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL-770x503.jpg",
                  "price":80000,
                  "stock":70,
                  "createdAt": "2020-12-01T06:10:32.375Z",
                  "updatedAt": "2020-12-01T06:10:32.375Z"
            },
            {
                  "id": 6,
                  "name": "product3",
                  "image_url": "https://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL-770x503.jpg",
                  "price":30000,
                  "stock":100,
                  "createdAt": "2020-12-01T06:10:32.375Z",
                  "updatedAt": "2020-12-01T06:10:32.375Z"
            },
         ]
      }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** 
      ```json 
         {
            "message": "You must login first"
         }
      ```
  OR

  * **Code:** 404 <br />
    **Content:** 
      ```json 
         {
            "message": "Product Not Found"
         }
      ```
  OR

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:**
      ```json
         {
            "message":"Server Error"
         }
      ```



**Fetch Products By Id**
----
  Returns json data of a product.

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
      `id=[integer]`

* **Headers**
   **Required:**
   `access_token=[string]`

* **Data Params**


* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
      {  
         "data": {
               "id": 4,
               "name": "coding2",
               "image_url": "https://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL-770x503.jpg",
               "price":24000,
               "stock":25,
               "createdAt": "2020-12-01T06:10:32.375Z",
               "updatedAt": "2020-12-01T06:10:32.375Z"
            },       
      }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** 
      ```json 
         {
            "message": "You must login first"
         }
      ```
  OR

  * **Code:** 404 <br />
    **Content:** 
      ```json 
         {
            "message": "Product Not Found"
         }
      ```
  OR

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:**
      ```json
         {
            "message":"Server Error"
         }
      ```






**Create Product**
----
  Returns json data of created product.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 

* **Headers**
   **Required:**
   `access_token=[string]`

* **Data Params**
   `name=[string]`
   `image_url=[string]`
   `price=[integer]`
   `stock=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
      {  
         "data": {
               "id": 4,
               "name": "coding2",
               "image_url": "https://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL-770x503.jpg",
               "price":24000,
               "stock":25,
               "createdAt": "2020-12-01T06:10:32.375Z",
               "updatedAt": "2020-12-01T06:10:32.375Z"
            },       
      }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
      ```json 
         {
            "message": "You must login first"
         }
      ```
      OR
      ```json 
         {
            "message": "You are not authorized to add/edit/update/delete product"
         }
      ```
      
      OR
      ```json
         {
            "message": "name must be filled"
         }
      ```

      OR
      ```json
         {
            "message": "stock/price can't be less than 0"
         }
      ```

      OR
      ```json
         {
            "message": "stock/price must be a number"
         }
      ```
  OR

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:**
      ```json
         {
            "message":"Server Error"
         }
      ```

**Delete Product**
----
  Returns json data of message confirmation.

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
   `id=[integer]`

* **Headers**
   **Required:**
   `access_token=[string]`

* **Data Params**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```json
      {  
         "message":"Resource Deleted Successfully"       
      }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
      ```json 
         {
            "message": "You must login first"
         }
      ```
  OR
  * **Code:** 400 <br />
    **Content:** 
      ```json 
         {
            "message": "You are not authorized to add/edit/update/delete product"
         }
      ``` 
   OR
  * **Code:** 500 <br />
    **Content:**
      ```json
         {
            "message":"Server Error"
         }
      ```


**Update Product**
----
  Returns json data of updated product.

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
   `id=[integer]`

* **Headers**
   **Required:**
   `access_token=[string]`

* **Data Params**
   `name=[string]`
   `image_url=[string]`
   `price=[integer]`
   `stock=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    ```json
      {  
         
         "id": 4,
         "name": "coding2",
         "image_url": "https://www.cbronline.com/wp-content/uploads/2016/06/what-is-URL-770x503.jpg",
         "price":24000,
         "stock":25,
         "createdAt": "2020-12-01T06:10:32.375Z",
         "updatedAt": "2020-12-01T06:10:32.375Z"
                
      }
    ```
 
* **Error Response:**
   * **Code:** 400 <br />
    **Content:** 
      ```json 
         {
            "message": "You must login first"
         }
      ```
      OR
      ```json 
         {
            "message": "You are not authorized to add/edit/update/delete product"
         }
      ```
      
      OR
      ```json
         {
            "message": "name must be filled"
         }
      ```

      OR
      ```json
         {
            "message": "stock/price can't be less than 0"
         }
      ```

      OR
      ```json
         {
            "message": "stock/price must be a number"
         }
      ```
  OR

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:**
      ```json
         {
            "message":"Server Error"
         }
      ```





