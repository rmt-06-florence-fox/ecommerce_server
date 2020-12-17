*Register
Users register

URL
/register

Method:
POST

URL Params
None

Headers
none

Req Body:
email: string
password: string
role: string

Data Params
None

Success Response:
Code: 201
Content: {
    "email": string,
    "id": integer
}
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

Code: 400 BAD REQUEST
Content: { message : "email must be unique" }

*Login
Users login

URL
/login

Method:
POST

URL Params
None

Headers
none

Req Body:
email: string
password: string

Data Params
None

Success Response:
Code: 200
Content: {
    "access_token": string,
}
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

Code: 401 UNAUTHORIZED
Content: { "message": "sorry, wrong email/ password" }

*Create Product
Create json data about a single product.

URL
/products

Method:
POST

URL Params
None

Headers
required:
access_token

Req Body:
stock: 10 (Integer)
price: 30000 (Integer)
name: "baju" (String)
image: "www.baju.com" (String)
description: "sebuah baju" (String)

Data Params
None

Success Response:
Code: 201
Content: {
    "id": 5,
    "stock": "10",
    "price": "30000",
    "name": "Baju",
    "image": "www.baju.com" 
    "description": "sebuah baju",
    "updatedAt": "2020-10-27T11:25:23.840Z",
    "createdAt": "2020-10-27T11:25:23.840Z"
}
Error Response:

Code: 400 BAD REQUEST
Content: { error : "<field> Harus Terisi!" }
OR

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Delete product
Delete json data about a single product.

URL
/products/:id

Method:
DELETE

URL Params
id:[integer]

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content: {"successfuly deleted"}

Error Response:
Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

or

Code: 401 UNAUTHORIZED
Content: { message : "please login first" }

*Show product
Returns json data about a single product.

URL
/products/:id

Method:
GET

URL Params
Required:
id=[integer]

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content: {
    "id": 5,
    "stock": "10",
    "price": "30000",
    "name": "Baju",
    "image": "www.baju.com" 
    "description": "sebuah baju",
    "updatedAt": "2020-10-27T11:25:23.840Z",
    "createdAt": "2020-10-27T11:25:23.840Z"
}

Error Response:
Code: 500 INTERNAL SERVER ERROR
Content: { error : "500 INTERNAL SERVER ERROR." }

*Update product
Changing attributes of one product.

URL
/products/:id

Method:
PUT

URL Params
required:
id=[integer]

Headers
required:
access_token

stock: 10 (Integer)
price: 300000 (Integer)
name: "baju" (String)
image: "www.baju.com" (String)
description: "sebuah baju" (String)

Data Params
None

Success Response:
Code: 200
Content:  {
    "id": 5,
    "stock": "5",
    "price": "300000",
    "name": "Baju",
    "image": "www.baju.com" 
    "description": "sebuah baju",
    "updatedAt": "2020-10-27T11:25:23.840Z",
    "createdAt": "2020-10-27T11:25:23.840Z"
}
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Get product
Get all list of products.

URL
/products

Method:
GET

URL Params
none

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content: 
        {
            "id": 5,
            "stock": "10",
            "price": "30000",
            "name": "Baju",
            "image": "www.baju.com" 
            "description": "sebuah baju",
            "updatedAt": "2020-10-27T11:25:23.840Z",
            "createdAt": "2020-10-27T11:25:23.840Z"
        }, 
        {
            "id": 6,
            "stock": "10",
            "price": "300000",
            "name": "Baju zara",
            "image": "www.bajuzara.com" 
            "description": "sebuah baju",
            "updatedAt": "2020-10-27T11:25:23.840Z",
            "createdAt": "2020-10-27T11:25:23.840Z"
        }
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

=== banner === 

*Create Banner
Create json data about a single product.

URL
/banner

Method:
POST

URL Params
None

Headers
required:
access_token

req body:
title: testing (String)
status: "active" (String)
image_url: "test" (String)

Data Params
None

Success Response:
Code: 201
Content: {
    "id": 25,
    "title": "testing",
    "status": "active",
    "image_url": "test",
    "updatedAt": "2020-12-12T08:39:41.124Z",
    "createdAt": "2020-12-12T08:39:41.124Z"
}
Error Response:

Code: 400 BAD REQUEST
Content: { error : "<field> Harus Terisi!" }
OR

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Delete banner
Delete json data about a single banner.

URL
/banner/:id

Method:
DELETE

URL Params
id:[integer]

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content: {"successfuly deleted"}

Error Response:
Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

or

Code: 401 UNAUTHORIZED
Content: { message : "please login first" }

*Show banner
Returns json data about a single banner.

URL
/banner/:id

Method:
GET

URL Params
Required:
id=[integer]

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content: {
    "id": 25,
    "title": "testing",
    "status": "active",
    "image_url": "test",
    "updatedAt": "2020-12-12T08:39:41.124Z",
    "createdAt": "2020-12-12T08:39:41.124Z"
}

Error Response:
Code: 500 INTERNAL SERVER ERROR
Content: { error : "500 INTERNAL SERVER ERROR." }

*Update banner
Changing attributes of one banner.

URL
/banner/:id

Method:
PUT

URL Params
required:
id=[integer]

Headers
required:
access_token

req body:
title: testing (String)
status: "inactive" (String)
image_url: "test" (String)

Data Params
None

Success Response:
Code: 200
Content:  {
    "id": 25,
    "title": "gajadi testing",
    "status": "inactive",
    "image_url": "test",
    "updatedAt": "2020-12-12T08:39:41.124Z",
    "createdAt": "2020-12-12T08:39:41.124Z"
}
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Get banners
Get all list of banners.

URL
/banner

Method:
GET

URL Params
none

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content: 
        {
            "id": 25,
            "title": "testing",
            "status": "active",
            "image_url": "test",
            "updatedAt": "2020-12-12T08:39:41.124Z",
            "createdAt": "2020-12-12T08:39:41.124Z"
        }, 
        {
            "id": 26,
            "title": "testing",
            "status": "active",
            "image_url": "test",
            "updatedAt": "2020-12-12T08:39:41.124Z",
            "createdAt": "2020-12-12T08:39:41.124Z"
        }
Error Response:

Code: 500 INTERNAL SERVER ERROR
Content: { error : "INTERNAL SERVER ERROR." }

*Add to cart
Add a product to your cart

URL
/carts

Method:
POST

URL Params
none

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content: 
        {
            "id": integer,
            "UserId": integer,
            "ProductId": integer,
        }, 

Error Response:

Code: 400 INTERNAL SERVER ERROR
Content: { error : "Product not found" }

*Update cart
Update the amount of a product in your cart

URL
/carts/:id

Method:
POST

URL Params
id: integer

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content: 
        {
            "id": integer,
            "UserId": integer,
            "ProductId": integer,
        }, 

Error Response:

Code: 400 INTERNAL SERVER ERROR
Content: { error : "Product not found" }

*Get Carts
show all products in your cart

URL
/carts

Method:
GET

URL Params
none

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content:[
            {
                "id": integer,
                "UserId": integer,
                "ProductId": integer,
                "Product" : {
                    "id" : integer,
                    "name" : string,
                    "imageUrl": string,
                    "stock": integer,
                    "price": integer
                }
            }
        ]    

Error Response:

Code: 400 INTERNAL SERVER ERROR
Content: { error : "Product not found" }

*Delete Carts
remove an item from your cart

URL
/carts

Method:
delete

URL Params
none

Headers
required:
access_token

Data Params
required
id: integer

Success Response:
Code: 200
Content: {message: "cart succesfully deleted"}    

Error Response:

Code: 400 INTERNAL SERVER ERROR
Content: { error : "Product not found" }

*Add to Wishlist
Add a product to your Wishlist

URL
/wishlist

Method:
POST

URL Params
productId: integer

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content: 
        {
            "id": integer,
            "UserId": integer,
            "ProductId": integer,
        }, 

Error Response:

Code: 400 INTERNAL SERVER ERROR
Content: { error : "can't add the same product to your wishlist" }

*Get Wishlist
show all products in your wishlist

URL
/wishlist

Method:
GET

URL Params
none

Headers
required:
access_token

Data Params
None

Success Response:
Code: 200
Content:[
            {
                "id": integer,
                "UserId": integer,
                "ProductId": integer,
                "Product" : {
                    "id" : integer,
                    "name" : string,
                    "imageUrl": string,
                    "stock": integer,
                    "price": integer
                }
            }
        ]    

Error Response:

Code: 400 INTERNAL SERVER ERROR
Content: { error : "Product not found" }

*Delete Wishlist
remove a product from your wishlist

URL
/wishlis

Method:
delete

URL Params
none

Headers
required:
access_token

Data Params
required
id: integer

Success Response:
Code: 200
Content: {message: "wishlist succesfully deleted"}    

Error Response:

Code: 400 INTERNAL SERVER ERROR
Content: { error : "wishlist not found" }