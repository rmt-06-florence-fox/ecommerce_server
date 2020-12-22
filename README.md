# ecommerce_server

Collection for routes ecommerce_server
===============================================================

Collection for routes Category
===============================================================

**Read Category**
----
  Read Category

* **URL**

  /categorie

* **Method:**
  
  `GET`

* **Request Headers**
  
* **Success Response:**
  
  * **Code:** 200 
    **Content:**
    
    [
    {
        "id": 3,
        "name": "Otomotif",
        "createdAt": "2020-12-16T08:20:55.267Z",
        "updatedAt": "2020-12-16T08:20:55.267Z",
        "Products": []
    },
    {
        "id": 4,
        "name": "Elektronik",
        "createdAt": "2020-12-16T08:21:17.869Z",
        "updatedAt": "2020-12-16T08:21:17.869Z",
        "Products": []
    },
    {
        "id": 5,
        "name": "Hobi",
        "createdAt": "2020-12-16T08:23:48.414Z",
        "updatedAt": "2020-12-16T08:23:48.414Z",
        "Products": []
    },
    {
        "id": 6,
        "name": "Fashion",
        "createdAt": "2020-12-16T08:25:19.948Z",
        "updatedAt": "2020-12-16T08:25:19.948Z",
        "Products": [
            {
                "id": 1,
                "name": "T-Shirt Deus",
                "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNM8iV5DIzq58QZwr_iepe4UDpZxa6m3te6A&usqp=CAU",
                "price": 200000,
                "stock": 10,
                "CategorieId": 6,
                "createdAt": "2020-12-16T08:44:21.154Z",
                "updatedAt": "2020-12-16T09:02:29.984Z"
            }
        ]
    },
    {
        "id": 7,
        "name": "Others",
        "createdAt": "2020-12-16T08:32:56.459Z",
        "updatedAt": "2020-12-16T08:32:56.459Z",
        "Products": []
    }
]
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
  **Content:**
  {
    "errors": "Internal Server Error"
  }

------------------------------------------------------------

  **Create Category**
----
  Create Category

* **URL**

 /categorie

* **Method:**
  
  `POST`

* **Request Headers**
  REQUIRED
  `headers = 'acces_token'`

* **DATA PARAMS**
  REQUIRED
  
  `name = [string]`
  
* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:**
    {
    "id": 9,
    "name": "Sport",
    "updatedAt": "2020-12-17T05:33:58.025Z",
    "createdAt": "2020-12-17T05:33:58.025Z"
    }
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR
  **Content:**
    {
        "errors": "Internal Server Error"
    }
  OR

  400 BAD REQUEST
  **Content**
    {
        "errors": [
            "name must be unique"
        ]
    }  

  ------------------------------------------------------------

  **Delete Category By Id**
----
  Delete Category By Id

* **URL**

  /categorie/:id

* **Method:**
  
  `DELETE`

* **Request Headers**
  REQUIRED
  `headers = 'acces_token'`

* **Url Params**
  REQUIRED
  `id = [integer]`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    { message: 'Success Delete'}
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR <br />

  OR

  404 ERROR NOT FOUND
    **Content:**
    { 
      error: "error not found" 
    }



  Collection for routes users
==================================================================

 **Create Account Admin**
----
  Create Account Admin

* **URL**

  /registeradmin

* **Method:**
  
  `POST`

* **DATA PARAMS**
  REQUIRED
  
  `email = [string]`
  `password = [string]`
  `role = ['admin']`
  
* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:**
    {message: 'Success to register Admin'}
 
* **Error Response:**

  * **Code:** 

  400 BAD REQUEST
    **Content:**
    {
      "errors": [
          "emailcannot Empty",
          "role cannot Empty",
          "Password cannot Empty"
      ]
    }

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
  { errors: `Internal Server Error` }

--------------------------------------------------------

 **Create Account Customer**
----
  Create Account Customer

* **URL**

 /registercustomer

* **Method:**
  
  `POST`

* **DATA PARAMS**
  REQUIRED
  
  `email = [string]`
  `password = [string]`
  `role = ['admin']`
  
  
* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:**
    {message: 'Success to register Customer'}
 
* **Error Response:**

  * **Code:** 

  400 BAD REQUEST
    **Content:**
    {
      "errors": [
          "emailcannot Empty",
          "role cannot Empty",
          "Password cannot Empty"
      ]
    }

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
  { errors: `Internal Server Error` }
--------------------------------------------------------

 **Login Account Admin**
----
  Login Account Admin

* **URL**

  /loginadmin

* **Method:**
  
  `POST`

* **DATA PARAMS**
  REQUIRED
  
  `email = [string]`
  `password = [string]`
  `role = ['admin]`
  
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
        "acces_token": "acces_token User"
    }
 
* **Error Response:**

  * **Code:** 

  400 BAD REQUEST
    **Content:**
        { message: "wrong Password/Email"}

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
  { errors: `Internal Server Error` }

------------------------------------------------------------------------------------

 **Login Account Customer**
----
  Login Account Customer

* **URL**

  /logincustomer

* **Method:**
  
  `POST`

* **DATA PARAMS**
  REQUIRED
  
  `email = [string]`
  `password = [string]`
  `role = ['customer']`
  
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    {
        "acces_token": "acces_token User"
    }
 
* **Error Response:**

  * **Code:** 

  400 BAD REQUEST
    **Content:**
        { message: "wrong Password/Email"}

  OR

  500 INTERNAL SERVICE EROR
    **Content:**
  { errors: `Internal Server Error` }


  Collection for routes Product
===============================================================

**Read Product**
----
  Read Product

* **URL**

 /products

* **Method:**
  
  `GET`

* **Request Headers**
  
* **Success Response:**
  
  * **Code:** 200 
    **Content:**
    
{
    "data": [
        {
            "id": 1,
            "name": "T-Shirt Deus",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNM8iV5DIzq58QZwr_iepe4UDpZxa6m3te6A&usqp=CAU",
            "price": 200000,
            "stock": 10,
            "CategorieId": 6,
            "createdAt": "2020-12-16T08:44:21.154Z",
            "updatedAt": "2020-12-16T09:02:29.984Z"
        }
    ]
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
  **Content:**
  {
    "errors": "Internal Server Error"
  }

------------------------------------------------------------

  **Create Product**
----
  Create Product

* **URL**

 /categorie

* **Method:**
  
  `POST`

* **Request Headers**
  REQUIRED
  `headers = 'acces_token'`

* **DATA PARAMS**
  REQUIRED
  
  `name = [string]`
  `image_url = [string]`
  `price = [integer]`
  `stock = [integer]`
  `CategorieId = [integer]`
  
* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:**
    {
    "id": 9,
    "name": "Sport",
    "image_url": "image_url",
    "price": "price",
    "stock": "stock",
    "CategorieId": "CategorieId"
    "updatedAt": "2020-12-17T05:33:58.025Z",
    "createdAt": "2020-12-17T05:33:58.025Z"
    }
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR
  **Content:**
    {
        "errors": "Internal Server Error"
    }

------------------------------------------------------------

**Read Product By Id**
----
  Read Product By Id

* **URL**

 /products/:id

* **Method:**
  
  `GET`

* **Request Headers*** **Request Headers**
  REQUIRED
  `headers = 'acces_token'`

* **DATA PARAMS**
  REQUIRED
  
  `id = [integer]`

* **Success Response:**
  
  * **Code:** 200 
    **Content:**
    
    {
        "id": 1,
        "name": "T-Shirt Deus",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNM8iV5DIzq58QZwr_iepe4UDpZxa6m3te6A&usqp=CAU",
        "price": 200000,
        "stock": 10,
        "CategorieId": 6,
        "createdAt": "2020-12-16T08:44:21.154Z",
        "updatedAt": "2020-12-16T09:02:29.984Z"
    }

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR
  **Content:**
  {
    "errors": "Internal Server Error"
  }

--------------------------------------------------------------

  **Delete Product By Id**
----
  Delete Product By Id

* **URL**

  /products/:id

* **Method:**
  
  `DELETE`

* **Request Headers**
  REQUIRED
  `headers = 'acces_token'`

* **Url Params**
  REQUIRED
  `id = [integer]`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    { The_number_of_destroyed_rows: data}
 
* **Error Response:**

  * **Code:** 
  500 INTERNAL SERVER ERROR <br />

  OR

  404 ERROR NOT FOUND
    **Content:**
    { 
      error: "error not found" 
    }