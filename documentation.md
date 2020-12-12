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

  * **Code:** 201 
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

* **URL**

  http://localhost:3000/categories/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
   Headers:

   access_token: string

   Body:

   category: string

* **Success Response:**

  * **Code:** 201 
{
    "id": 13,
    "category": "Entertainment",
    "updatedAt": "2020-12-12T13:10:01.398Z",
    "createdAt": "2020-12-12T13:10:01.398Z"
}
 
* **Error Response:**

  * **Code:** 400
{
    "message": "category is required"
}

  * **Code:** 401

{
    "message": "please login first"
}

* **URL**

  http://localhost:3000/categories

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
            "category": "Fiction",
            "createdAt": "2020-12-12T08:47:59.169Z",
            "updatedAt": "2020-12-12T08:47:59.169Z",
            "Products": [
                {
                    "id": 1,
                    "name": "Harry Potter and The Cursed Child-edit",
                    "image_url": "https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg",
                    "price": 127000,
                    "stock": 10,
                    "createdAt": "2020-12-12T08:49:51.458Z",
                    "updatedAt": "2020-12-12T08:49:51.458Z",
                    "ProductCategory": {
                        "ProductId": 1,
                        "CategoryId": 1,
                        "createdAt": "2020-12-12T08:51:25.318Z",
                        "updatedAt": "2020-12-12T08:51:25.318Z"
                    }
                },
                {
                    "id": 2,
                    "name": "Harry Potter And The Goblet Of Fire - Hufflepuff Edition",
                    "image_url": "https://cdn.gramedia.com/uploads/items/9781526610300.jpg",
                    "price": 205000,
                    "stock": 4,
                    "createdAt": "2020-12-12T08:50:40.907Z",
                    "updatedAt": "2020-12-12T08:50:40.907Z",
                    "ProductCategory": {
                        "ProductId": 2,
                        "CategoryId": 1,
                        "createdAt": "2020-12-12T08:51:25.318Z",
                        "updatedAt": "2020-12-12T08:51:25.318Z"
                    }
                },
                {
                    "id": 6,
                    "name": "Harry Potter and The Cursed Child",
                    "image_url": "https://cdn.gramedia.com/uploads/items/9786020386201_Harry-Potter-.jpg",
                    "price": 115000,
                    "stock": 3,
                    "createdAt": "2020-12-12T12:01:12.249Z",
                    "updatedAt": "2020-12-12T12:03:18.939Z",
                    "ProductCategory": {
                        "ProductId": 6,
                        "CategoryId": 1,
                        "createdAt": "2020-12-12T12:01:12.263Z",
                        "updatedAt": "2020-12-12T12:03:18.952Z"
                    }
                }
            ]
        },
        {
            "id": 4,
            "category": "Motivation",
            "createdAt": "2020-12-12T08:47:59.169Z",
            "updatedAt": "2020-12-12T08:47:59.169Z",
            "Products": [
                {
                    "id": 3,
                    "name": "Sebuah Seni untuk Bersikap Bodo Amat",
                    "image_url": "https://cdn.gramedia.com/uploads/items/9786024526986_Sebuah-Seni-Untuk-Bersikap-Bodo-Amat.jpg",
                    "price": 70000,
                    "stock": 5,
                    "createdAt": "2020-12-12T10:17:35.031Z",
                    "updatedAt": "2020-12-12T10:55:01.697Z",
                    "ProductCategory": {
                        "ProductId": 3,
                        "CategoryId": 4,
                        "createdAt": "2020-12-12T10:17:35.049Z",
                        "updatedAt": "2020-12-12T10:55:01.715Z"
                    }
                },
                {
                    "id": 8,
                    "name": "Harry Potter And The Goblet Of Fire - Hufflepuff Edition",
                    "image_url": "https://cdn.gramedia.com/uploads/items/9781526610300.jpg",
                    "price": 180000,
                    "stock": 4,
                    "createdAt": "2020-12-12T12:03:49.613Z",
                    "updatedAt": "2020-12-12T12:48:38.444Z",
                    "ProductCategory": {
                        "ProductId": 8,
                        "CategoryId": 4,
                        "createdAt": "2020-12-12T12:03:49.623Z",
                        "updatedAt": "2020-12-12T12:48:38.462Z"
                    }
                }
            ]
        },
        {
            "id": 2,
            "category": "Educational",
            "createdAt": "2020-12-12T08:47:59.169Z",
            "updatedAt": "2020-12-12T08:47:59.169Z",
            "Products": []
        },
        {
            "id": 13,
            "category": "Entertainment",
            "createdAt": "2020-12-12T13:10:01.398Z",
            "updatedAt": "2020-12-12T13:10:01.398Z",
            "Products": []
        },
        {
            "id": 3,
            "category": "Religious",
            "createdAt": "2020-12-12T08:47:59.169Z",
            "updatedAt": "2020-12-12T08:47:59.169Z",
            "Products": []
        },
        {
            "id": 9,
            "category": "Children",
            "createdAt": "2020-12-12T11:54:50.807Z",
            "updatedAt": "2020-12-12T11:54:50.807Z",
            "Products": []
        }
    ]
}
 

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
   Headers:

   access_token: string

   Body:

   ProductId: Integer,
   CategoryId: Integer

* **Success Response:**

  * **Code:** 201 
{
    "ProductId": 1,
    "CategoryId": 3,
    "updatedAt": "2020-12-12T13:14:33.655Z",
    "createdAt": "2020-12-12T13:14:33.655Z"
}
 
 * **Error Response:**

  * **Code:** 500
{
    "message": "internal server error"
}

* **Method:**

  `PUT`
  
*  **URL Params**

    id: Integer

   **Required:**
   Headers:

   access_token: string

   Body:

   ProductId: Integer,
   CategoryId: Integer

* **Success Response:**

  * **Code:** 200 
{
    "ProductId": 1,
    "CategoryId": 2,
    "createdAt": "2020-12-12T08:51:25.318Z",
    "updatedAt": "2020-12-12T13:18:03.150Z"
}
 
 * **Error Response:**

  * **Code:** 500
{
    "message": "internal server error"
}