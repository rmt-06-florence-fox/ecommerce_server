# User

**Register User**
----
  Add new User in database

* **URL**

  `/register`

* **Method:**

  `POST` 

**Request :**

**Data Params**
```json
  {
    "name" : "yunim",
    "email" : "admin2@mail.com",
    "password" : "aa",
    "role" : "admin"
  }
  ```

**Success Response:**

  * **Code:** 201 CREATED <br />
  {
    "id": 1,
    "email": "admin2@mail.com"
}


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```

  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />


**User Login**
----
  User login

* **URL**

  `/login`

* **Method:**

  `POST` 

**Request :**

**Data Params**
```json
  {
  
    "email" : "admin2@mail.com",
    "password" : "aa"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
    {
      "access_token"
    }
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```

  **OR**
  * **Code:** 401 UNAUTHORIZED<br />

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />

**Register User**
----
  Add new Customer in database

* **URL**

  `/registerCust`

* **Method:**

  `POST` 

**Request :**

**Data Params**
```json
  {
    "email" : "cust@mail.com",
    "password" : "aa",

  }
  ```

**Success Response:**

  * **Code:** 201 CREATED <br />
  {
    "id": 1,
    "email": "cust@mail.com"
}


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```

  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />


**User Login**
----
  Cust login

* **URL**

  `/loginCust`

* **Method:**

  `POST` 

**Request :**

**Data Params**
```json
  {
  
    "email" : "cust@mail.com",
    "password" : "aa"
  }
```


**Success Response:**

  * **Code:** 200 OK <br />
  **Content:** 
  ```json
    {
      "access_token"
    }
  ```


**Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```

  **OR**
  * **Code:** 401 UNAUTHORIZED<br />

  **OR**

  * **Code:** 500 INTERNAL SERVER ERROR<br />


# Products #
**Get All Products**
----
  Get all products data
* **URL**
  `
* **Method:**
  
  `GET` 

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```
**Success Response:**
  * **Code:** 200 OK <br />
  **Content:** 
  ```json
  [
    {
        "id": 4,
        "name": "Product Name",
        "image_url": "url",
        "price": 000,
        "stock": 2
    }
  ]
  ```
**Error Response:**
  **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />
  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />

**Add New products**
----
  Create new products
* **URL**
  `/products`
* **Method:**
  
  `POST` 

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```
**Data Params**
```json
  {

        "id": 4,
        "name": "Product Name",
        "image_url": "url",
        "price": 000,
        "stock": 2

}
```
**Success Response:**

  **Code:** 200 OK <br />

  **Content:** 
  ``` json
  {
    "id": 4,
    "name": "Product Name",
    "image_url": "url",
    "price": 000,
    "stock": 2
    "updatedAt": "2020-12-01T12:09:00.604Z",
    "createdAt": "2020-12-01T12:09:00.604Z"
  }
  ```

**Error Response:**
   **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  **Code:** 401 UNAUTHORIZED<br />
  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />



**Edit products**
----
  Edit products
**URL**
  `/edit/:id`

**Method:**
  `PUT` 

**Request :**

**URL Params**

**Required :**
  
  `id `
**Header Params**
```json
  {
    "access_token"
  }
```
**Data Params**
``` json
  {
    "id": 4,
    "name": "Product Name",
    "image_url": "url",
    "price": 000,
    "stock": 2
    "updatedAt": "2020-12-01T12:09:00.604Z",
    "createdAt": "2020-12-01T12:09:00.604Z"
  }
  ```
**Success Response:**
  **Code:** 200 OK <br />
**Error Response:**
  **Code:** 400 BAD REQUEST <br />
  
    ```json
      {
        "message" : Error Message
      }
    ```
    
  **OR**
  **Code:** 401 UNAUTHORIZED<br />

    ```json
      {
        "message" : "You Dont Have Permission to Do this Action, You are not admin"
      }
    ```

  **OR**
   **Code:** 500 INTERNAL SERVER ERROR<br />


  
**Delete products**
----
  Delete products by Id

 **URL**
  `/delete/:id`


 **Method:**
  `DELETE`


**Request :**

**URL Params**

**Required :**
  
  `id,access_token`
**Header Params**
```json
  {
    "access_token"
  }
```
**Success Response:**
  * **Code:** 200 OK <br />

```json
  {
    "message": "products deleted"
  } 
```

**Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />
  ```json
      {
        "message" :   "You Dont Have Permission to Do this Action"
      }
    ```

  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />


# Cart
**Get All Cart**
----
  Get all Cart data
* **URL**
  `/carts`
* **Method:**
  
  `GET` 

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```
**Success Response:**
  * **Code:** 200 OK <br />
  **Content:** 
  ```json
  [
    {
        "id": 4,
        "UserId": 1,
        "ProductId": 2,
        "Amount": 2
        "Product": {{}}
    }
  ]
  ```
**Error Response:**
  **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />
  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />


**Add New Cart**
----
  Create new Cart or Update
* **URL**
  `/add/carts`
* **Method:**
  
  `POST` or `UPDATE`

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```
**Data Params**
```json
  {

    "amount":1,
    "ProductId": 2,

}
```
**Success Response:**

  **Code:** 200 OK <br />

  **Content:** 
  ```json ```
  {
    "id": 4,
    "ProductId": 2,
    "amount": 1,
    "updatedAt": "2020-12-01T12:09:00.604Z",
    "createdAt": "2020-12-01T12:09:00.604Z"
}

**Error Response:**
   **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  **Code:** 401 UNAUTHORIZED<br />
  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />


**Decrease or Increase Amount Cart**
----
  
* **URL**
  `/carts/:od`
* **Method:**
  
  `PATCH`

**Request :**

**Header Params**
```json
  {
    "access_token"
  }
```
**Data Params**
```json
  {

    "amount":1,

}
```
**Success Response:**

  **Code:** 200 OK <br />

  **Content:** 
  ```json ```
  {
    "id": 4,
    "ProductId": 2,
    "amount": 3,
    "updatedAt": "2020-12-01T12:09:00.604Z",
    "createdAt": "2020-12-01T12:09:00.604Z"
}

**Error Response:**
   **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  **Code:** 401 UNAUTHORIZED<br />
  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />

  
**Delete Cart**
----
  Delete Cart by Id

 **URL**
  `/carts/:id`


 **Method:**
  `DELETE`

**Required :**
  `id,access_token`
  
**Header Params**
```json
  {
    "access_token"
  }
```
**Success Response:**
  * **Code:** 200 OK <br />

```json
  {
    "message": "Cart deleted"
  } 
```

**Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **message** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
  **OR**
  * **Code:** 401 UNAUTHORIZED<br />
  ```json
      {
        "message" :   "You Dont Have Permission to Do this Action"
      }
    ```

  **OR**
  * **Code:** 500 INTERNAL SERVER ERROR<br />