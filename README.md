# ecommerce_server

link demo: (https://ecommerce-jar.web.app/)
link server: (https://e-commerce-jar.herokuapp.com/)
login with account : email: admin@mail.com,
                     password: 123456
## Users Routes

### POST /login : login to user's account

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

### GET /Products : show all product lists.

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

### GET /Products/:id : show a selected product list based on id

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

### PUT /Products/:id : update a product list

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

### DELETE /Products/:id : delete a selected product list based on id

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