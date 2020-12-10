# Muchsin Store
## API Documentation

by. Syihab Muchsin

<br>



## Table of Contents

<!-- toc -->
==================================================================
[Users](#users)
  
  * [User Login](#user-login)

[Products](#products)
  * [Add Products](#add-products)
  * [Show Products](#show-products)
  * [Update Products](#update-products)
  * [Delete Products](#delete-products)


<!-- tocstop -->
==================================================================

## *Users*
----
### User Login 

  
Method: `POST /login`

 Request Body (*required*) :
  
    email    = [string]
    password = [string]
  
  
Success Response :
 
  ```
    
    -- Login Success -- 
    ----------------------------------------------------

        Status : 200 OK

        Body   :

        {
          id: [integer],
          role: [string],
          access_token: [string]
        }

    ----------------------------------------------------
  ```
 
Error Responses :
  ```
    
    -- Emain not registered -- 
    ----------------------------------------------------

        Status : 404 Not Found
        Body   :
        
        {
          "message": "User not found"
        }

    ----------------------------------------------------

   
    -- Empty Field --
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": [field] "cannot be empty"
        },
        ...

    ----------------------------------------------------

   
    -- Invalid Password --
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": "Invalid email/password"
        }

    ----------------------------------------------------


    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```

------------------------------------------------------------------------------------

## *Products*

----
### Add Products
----
Method: `POST /products`

 Request Headers (*required*) :
  
    access_token
  

Request Body  :
  
    name      = [string]
    image_url = [string] | optional
    price     = [integer]
    stock     = [integer]

Success Response :
 
  ```
    
    -- Add Product Success -- 
    ----------------------------------------------------

        Status : 201 Created
        Body   :

        {
          "message": "Success add product",
          "newProduct": 
           {
              "id": [integer],
              "name": [string],
              "image_url": [string],
              "price": [integer],
              "stock": [integer],
              "createdAt": [date]
           }
        }

    ----------------------------------------------------
  ```
 
Error Responses :
  ```
    
    -- Not login -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "Please login"
        }

    ----------------------------------------------------

    -- Not Admin -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "You're not allowed to do this action"
        }

    ----------------------------------------------------
   
    -- Empty Required Field --
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": [field] "cannot be empty"
        }
        ...
        ...

    ----------------------------------------------------

    -- Invalid Input --
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": [ price | stock ] "must be Number"
        }

    ----------------------------------------------------


    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```


### Show Products
----
Method: `GET /products`

 Request Headers (*required*) :
  
    access_token

Success Response :
 
  ```
    
    -- Show Product Success -- 
    ----------------------------------------------------

        Status : 200 OK
        Body   :

        [
          {
            "id": [integer],
            "name": [string],
            "image_url": [string],
            "price": [integer],
            "stock": [integer],
            "createdAt": [date]
          },
          {
            "id": [integer],
            "name": [string],
            "image_url": [string],
            "price": [integer],
            "stock": [integer],
            "createdAt": [date]
          },
          ...
          ...
        ]

    ----------------------------------------------------
  ```
Error Responses :
  ```
    
    -- Not login -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "Please login"
        }

    ----------------------------------------------------

    -- Not Admin -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "You're not allowed access this page"
        }

    ----------------------------------------------------

    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```
### Update Products
----
Method: `PUT /products/:id`

 Request Headers (*required*) :
  
    access_token

Request Params (*required*)  :
  
    id     = [integer]

Request Body  :
  
    name      = [string]
    image_url = [string] | optional
    price     = [integer]
    stock     = [integer]

Success Response :
 
  ```
    
    -- Update Product Success -- 
    ----------------------------------------------------

        Status : 200 OK
        Body   :

        {
          "message": "Update Success",
          "updated": 
           {
              "id": [integer],
              "name": [string],
              "image_url": [string],
              "price": [integer],
              "stock": [integer],
              "createdAt": [date]
           }
        }

    ----------------------------------------------------
  ```
 
Error Responses :
  ```
    
    -- Not login -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "Please login"
        }

    ----------------------------------------------------

    -- Not Admin -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "You're not allowed access this page"
        }

    ----------------------------------------------------

    -- Invalid id -- 
    ----------------------------------------------------

        Status : 404 Not Found
        Body   :
        
        {
          "message": "Product not found"
        }

    ----------------------------------------------------
   
    -- Empty Required Field --
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": [field] "cannot be empty"
        }
        ...
        ...

    ----------------------------------------------------

    -- Invalid Input --
    ----------------------------------------------------

        Status : 400 Bad Request
        Body   :
        
        {
          "message": [ price | stock ] "must be Number"
        }

    ----------------------------------------------------


    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```

### Delete Products
----
Method: `DELETE /products/:id`

 Request Headers (*required*) :
  
    access_token

Request Params (*required*)  :
  
    id     = [integer]

Success Response :
 
  ```
    
    -- Update Product Success -- 
    ----------------------------------------------------

        Status : 200 OK
        Body   :

        {
          "message": "Delete Success",
          "deleted": 
           {
              "id": [integer],
              "name": [string],
              "image_url": [string],
              "price": [integer],
              "stock": [integer],
              "createdAt": [date]
           }
        }

    ----------------------------------------------------
  ```
 
Error Responses :
  ```
    
    -- Not login -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "Please login"
        }

    ----------------------------------------------------

    -- Not Admin -- 
    ----------------------------------------------------

        Status : 401 Unauthorized
        Body   :
        
        {
          "message": "You're not allowed access this page"
        }

    ----------------------------------------------------

    -- Invalid id -- 
    ----------------------------------------------------

        Status : 404 Not Found
        Body   :
        
        {
          "message": "Product not found"
        }

    ----------------------------------------------------
   

    -- Others --
    ----------------------------------------------------

        Status : 500 Internal Server Error
        Body   :
        
        "Internal Server Error"

    ----------------------------------------------------

  ```

----
  End of API Documentation