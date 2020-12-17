# ecommerce_server

link demo-Customer: ()
link demo-CMS: (https://ecommerce-jar.web.app/)
link server: (https://e-commerce-jar.herokuapp.com/)
login with admin account : email: admin@mail.com, password: 123456

## Users Routes

### POST /register : register to user's account

    - Request Header
        Not required.

    - Request Body
        {
            "email": "<user's email>",
            "password": "<user's password>"
        }

    - Response 200: OK
        {
            "email": "<user's email>",
            "password": "<user's password>"
        }

    - Response 400: Bad Request
        {
            "message": "Invalid email/password"
        }

    - Response 500: Internal server error
        {
            "message": "Internal Server Error"
        }

### POST /logincustomer : login to user's customer account

    - Request Header
        Not required.

    - Request Body
        {
            "email": "<user's email>",
            "password": "<user's password>"
            "role": "customer"
        }

    - Response 200: OK
        {
            "access_token": "<user's token>"
        }

    - Response 400: Bad Request
        {
            "message": "Invalid email/password"
        }

    - Response 500: Internal server error
        {
            "message": "Internal Server Error"
        }
        
### POST /login : login to user's admin account

    - Request Header
        Not required.

    - Request Body
        {
            "email": "<user's email>",
            "password": "<user's password>"
        }

    - Response 200: OK
        {
            "access_token": "<user's token>"
        }

    - Response 400: Bad Request
        {
            "message": "Invalid email/password"
        }

    - Response 500: Internal server error
        {
            "message": "Internal Server Error"
        }


## Products Routes

### POST /products : Create new product list

    - Request Header
        {
            "access_token":"<access token>"
        }


    - Request Body
        {
            "name": "<product name>",
            "image_url": "<image_url of product>",
            "price": "<price of product>",
            "stock": "<stock of product>"
        }

    - Response 201: Created
        {
            "id": <given id by system>,
            "name": "<posted product name>",
            "image_url": "<posted image_url>",
            "price": "<posted price>",
            "stock": "<posted stock>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }

    - Response 400: Bad Request
        [
            { 
                message: "Name of product must be filled!" 
            },
            { 
                message: "Image URL of product must be filled!" 
            },
            { 
                message: "Price of product must be filled!" 
            },
            { 
                message: "Price of product must be an integer" 
            },
            { 
                message: "Stock of product must be filled!" 
            },
            { 
                message: "Stock of product must be an integer" 
            }
        ]

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }

    - Response 500: Internal server error
        {
            "message": `Internal Server Error.`
        }

### GET /products : show all product lists.

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Body
        Not required.

    - Response 200: OK
        {
            "product": [
                {
                    "id": 6,
                    "name": "iphone 11 pro",
                    "image_url": "https://eraspace.com/pub/media/catalog/product/cache/184775a204380039ae47e1177f9cfc1b/a/p/apple_iphone_11_pro_space_grey_1_4_1_1.jpg",
                    "price": 15799000,
                    "stock": 4,
                    "createdAt": "2020-12-12T04:27:28.411Z",
                    "updatedAt": "2020-12-12T04:30:31.116Z"
                },
                {
                    "id": 7,
                    "name": "iphone 11 pro juga",
                    "image_url": "https://eraspace.com/pub/media/catalog/product/cache/184775a204380039ae47e1177f9cfc1b/a/p/apple_iphone_11_pro_space_grey_1_4_1_1.jpg",
                    "price": 1500000,
                    "stock": 5,
                    "createdAt": "2020-12-12T04:31:28.265Z",
                    "updatedAt": "2020-12-12T04:31:36.397Z"
                },
                {
                    "id": 2,
                    "name": "iphone 12 pro max",
                    "image_url": "https://eraspace.com/pub/media/catalog/product/cache/184775a204380039ae47e1177f9cfc1b/i/p/iphone_12_pro_pacific_blue_1_3.jpg",
                    "price": 2000000,
                    "stock": 5,
                    "createdAt": "2020-12-12T00:28:17.629Z",
                    "updatedAt": "2020-12-12T05:23:52.164Z"
                }
            ]
        }

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }
    - Response 500: Internal server error
        {
            "message": `Internal Server Error. <show error>`
        }

### GET /products/:id : show a selected product list based on id

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": <selected product list id>
        }

    - Request Body
        Not required.

    - Response 200: OK
            {
                "id": 6,
                "name": "iphone 11 pro",
                "image_url": "https://eraspace.com/pub/media/catalog/product/cache/184775a204380039ae47e1177f9cfc1b/a/p/apple_iphone_11_pro_space_grey_1_4_1_1.jpg",
                "price": 15799000,
                "stock": 4,
                "createdAt": "2020-12-12T04:27:28.411Z",
                "updatedAt": "2020-12-12T04:30:31.116Z"
            }

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }

    - Response 404: Not Found
        {
            message: `Error not found.`
        }

    - Response 500: Internal server error
        {
            "message": `Internal Server Error.`
        }

### PUT /products/:id : update a product list

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": <selected product list id>
        }

    - Request Body
        {
            "name": "<product name>",
            "image_url": "<image_url of product>",
            "price": "<price of product>",
            "stock": "<stock of product>",
        }

    - Response 200: OK
        {
            "id": <selected product list id>,
            "name": "<updated product name>",
            "image_url": "<updated image_url>",
            "price": "<updated price>",
            "stock": "<updated stock>",
            "createdAt": "<date given by system>",
            "updatedAt": "<date given by system>"
        }

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }

    - Response 404: Not Found
        {
            "message": `Error not found.`
        }

    - Response 400: Bad Request
        [
            { 
                message: "Name of product must be filled!" 
            },
            { 
                message: "Image URL of product must be filled!" 
            },
            { 
                message: "Price of product must be filled!" 
            },
            { 
                message: "Price of product must be an integer" 
            },
            { 
                message: "Stock of product must be filled!" 
            },
            { 
                message: "Stock of product must be an integer" 
            }
        ]

    - Response 500: Internal server error
        {
            "message": `Internal Server Error.`
        }

### DELETE /products/:id : delete a selected product list based on id

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": <selected product list id>
        }

    - Request Body
        Not required.

    - Response 200: OK
        {
            "message": "Successfully to delete products"
        }

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }

    - Response 404: Not Found
        {
            "message": `Error not found.`
        }

    - Response 500: Internal server error
        {
            "message": `Internal Server Error.`
        }

## Carts Routes

### POST /carts : Create new cart list

    - Request Header
        {
            "access_token":"<access token>"
        }


    - Request Body
        {
            "User.id": "<req.loggedInUser.id>",
            "ProductId": "<req.body.ProductId>",
            "quantity": "<quantity of cart>"
        }

    - Response 201: Created
        {
            "status": false,
            "id": 48,
            "UserId": 9,
            "ProductId": 1,
            "quantity": 1,
            "updatedAt": "2020-12-16T17:35:28.295Z",
            "createdAt": "2020-12-16T17:35:28.295Z"
        }

    - Response 400: Bad Request
        {
            "message": "stock not available"
        }

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }

    - Response 500: Internal server error
        {
            "message": `Internal Server Error.`
        }

### GET /carts : show all cart lists.

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Body
        Not required.

    - Response 200: OK
    [
        {
            "id": 48,
            "UserId": 9,
            "ProductId": 1,
            "quantity": 1,
            "status": false,
            "createdAt": "2020-12-16T17:35:28.295Z",
            "updatedAt": "2020-12-16T17:35:28.295Z",
            "Product": {
                "id": 1,
                "name": "Iphone 12 Pro",
                "image_url": "https://i.pcmag.com/imagery/reviews/03vN5IfWzyBHdqN00j3w6Dd-5..1604007897.jpg",
                "price": 18499000,
                "stock": 5,
                "createdAt": "2020-12-15T15:31:46.695Z",
                "updatedAt": "2020-12-15T15:31:46.695Z"
            }
        }
    ]

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }
    - Response 500: Internal server error
        {
            "message": `Internal Server Error. <show error>`
        }

### PATCH /carts/:id : update a cart list

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": <selected cart list id>
        }

    - Request Body
        {
            "quantity": "<req.body.quantity>"
        }

    - Response 200: OK
        {
            "id": 33,
            "UserId": 9,
            "ProductId": 2,
            "quantity": 3,
            "status": false,
            "createdAt": "2020-12-16T12:42:19.136Z",
            "updatedAt": "2020-12-16T14:37:24.357Z"
        }

    - Response 400: Bad Request
        {
            "message": "stock not available"
        }

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }

    - Response 404: Not Found
        {
            "message": `Error not found.`
        }

    - Response 500: Internal server error
        {
            "message": `Internal Server Error.`
        }

### DELETE /carts/:id : delete a selected cart list based on id

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Parameter
        {
            "id": <selected cart list id>
        }

    - Request Body
        Not required.

    - Response 200: OK
        {
            "message": "Successfully to delete carts"
        }

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }

    - Response 404: Not Found
        {
            "message": `Error not found.`
        }

    - Response 500: Internal server error
        {
            "message": `Internal Server Error.`
        }

### DELETE /carts : delete a all cart list

    - Request Header
        {
            "access_token":"<access token>"
        }

    - Request Body
        Not required.

    - Response 200: OK
        {
            "message": "Successfully delete items from cart!"
        }

    - Response 401: Unauthorized
        {
            "message": "Please Login First"
        }

    - Response 404: Not Found
        {
            "message": `Error not found.`
        }

    - Response 500: Internal server error
        {
            "message": `Internal Server Error.`
        }
