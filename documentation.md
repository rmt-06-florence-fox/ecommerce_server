**Title**

    SERVER CMS

* **URL**

  http://localhost:3000/login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   email: string,
   password: string

* **Success Response:**

  * **Code:** 201 
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwNzc0ODExMX0.q_tZtmy4lK0Ou-pfy5CZhrXi405wRspqLj9DYtPvZmw"
}
 
* **Error Response:**

  * **Code:** 400
{
    "message": "wrong email/password"
}

* **URL**

  http://localhost:3000/products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   Headers:

   access_token: string

* **Success Response:**

  * **Code:** 200 
{
    "data": [
        {
            "id": 1,
            "name": "Harry Potter and The Cursed Child-edit",
            "image_url": "https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg",
            "price": 127000,
            "stock": 10,
            "createdAt": "2020-12-08T08:32:53.247Z",
            "updatedAt": "2020-12-12T00:36:01.528Z"
        },
        {
            "id": 3,
            "name": "Harry Potter And The Goblet Of Fire - Hufflepuff Edition",
            "image_url": "https://cdn.gramedia.com/uploads/items/9781526610300.jpg",
            "price": 205000,
            "stock": 4,
            "createdAt": "2020-12-09T12:18:09.328Z",
            "updatedAt": "2020-12-12T02:59:45.121Z"
        }
    ]
}
 
* **Error Response:**

  * **Code:** 500
{
    "message": "internal server error"
}

* **URL**

  http://localhost:3000/products

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
   Headers:

   access_token: string

   Body:

   name: string,
   image_url: string,
   price: integer,
   stock: integer

* **Success Response:**

  * **Code:** 200 
{
    "id": 6,
    "name": "Harry Potter and The Cursed Child",
    "image_url": "https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg",
    "price": 127000,
    "stock": 10,
    "updatedAt": "2020-12-12T04:51:55.176Z",
    "createdAt": "2020-12-12T04:51:55.176Z"
}
 
* **Error Response:**

  * **Code:** 400
{
    "message": "name is required,image is required,price is required,price must be number,stock is required,stock must be number"
}

  * **Code:** 401

{
    "message": "please login first"
}

* **URL**

  http://localhost:3000/products/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   id: integer

   **Required:**
   Headers:

   access_token: string

   Body:

   name: string,
   image_url: string,
   price: integer,
   stock: integer

* **Success Response:**

  * **Code:** 200 
{
    "id": 6,
    "name": "Harry Potter and The Cursed Child-edit",
    "image_url": "https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg",
    "price": 100000,
    "stock": 5,
    "createdAt": "2020-12-12T04:51:55.176Z",
    "updatedAt": "2020-12-12T05:01:39.050Z"
}
 
* **Error Response:**

  * **Code:** 400
{
    "message": "name is required,price is required,price must be number,stock is required,stock must be number"
}

  * **Code:** 401

{
    "message": "please login first"
}

* **URL**

  http://localhost:3000/products/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   id: integer

   **Required:**
   Headers:

   access_token: string


* **Success Response:**

  * **Code:** 200 
{
    "message": "Product success to delete"
}
 
* **Error Response:**

  * **Code:** 404
{
    "message": "data not found"
}

  * **Code:** 401

{
    "message": "please login first"
}
