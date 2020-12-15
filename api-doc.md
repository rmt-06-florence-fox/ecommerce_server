# E-Commerce CMS - API-Documentation with Markdown

### Updated on 15 December 2020, 15:46AM GMT+07:00

---

## POST /register

_Request Body_

```
{
    (REQUIRED) "email": "customer@email.com",
    (REQUIRED) "password": "123456"
}
```

_Response (201 - Created)_

```
{
    "id": 2,
    "email": "customer@email.com",
}
```

_Response (400 - Bad Request - Email must unique)_

```
{
    "message": "This Email has been Taken, try another one"
}
```

_Response (400 - Bad Request - Email & Password cannot be empty)_

```
{
    "message": [
      "Email Cannot be Empty",
      "Password Cannot be Empty"
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## POST /login

_Request Body_

```
{
    (REQUIRED) "email": "admin@email.com",
    (REQUIRED) "password": "123456"
}
```

_Response (200 - Ok)_

```
{
    "access_token": "/ token from login /"
}
```

_Response (401 - Bad Request - Invalid Account or Password)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (400 - Bad Request - Email & Password cannot be Null)_

```
{
    "message": 'Email or Password Cannot be Empty'
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## POST /loginUser

_Request Body_

```
{
    (REQUIRED) "email": "test@email.com",
    (REQUIRED) "password": "1234"
}
```

_Response (200 - Ok)_

```
{
    "access_token": "/ token from login /"
}
```

_Response (401 - Not Authorized - Invalid Account or Password)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (400 - Bad Request - Email & Password cannot be Null)_

```
{
    "message": 'Email or Password Cannot be Empty'
}
```

_Response (401 - Not Authorized - User Role not 'customer')_

```
{
    "message": "This Site is For Customer Only"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## GET /products

_Response (200 - Ok)_

```
[
  {
    id: 1,
    name: 'Barang Dummy',
    image_url: 'Gambar Dummy URL',
    price: 100000,
    stock: 10,
    createdAt: '2020-12-07T18:18:4544Z',
    updatedAt: '2020-12-07T18:18:48.544Z'
  }
]
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## GET /products/:id

_Response (200 - Ok)_

```
{
    id: 1,
    name: 'Barang Dummy',
    image_url: 'Gambar Dummy URL',
    price: 100000,
    stock: 10,
    createdAt: '2020-12-07T18:18:4544Z',
    updatedAt: '2020-12-07T18:18:48.544Z'
}
```

_Response (404 - Not Found - Product's Id Not Found)_

```
{
    "message": "Product Not Found"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## POST /products

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login with admin role/"
}
```

_Request Body_

```
{
    (REQUIRED) "name": "Tas",
    (REQUIRED) "image_url": "Gambar Tas URL"
    (REQUIRED) "price": 20000
    (REQUIRED) "stock": 30
}
```

_Response (201 - Created)_

```
{
    "id": 2,
    "title": "Tas",
    "image_url": "Gambar Tas URL",
    "price": "20000",
    "stock": "30"
    "updatedAt": "2020-12-01T09:19:36.583Z",
    "createdAt": "2020-12-01T09:19:36.583Z",
}
```

_Response (401 - Unauthorized - Logged In User Role not Admin)_

```
{
    "message": "Only Admin Who Have Authorization for this Action"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (400 - Bad Request - Products Attributes cannot be Empty)_

```
{
    "message": [
			"Product's Name Cannot be Empty",
			"Product's Image Cannot be Empty",
			"Product's Price Cannot be Empty",
		    "Product's Stock Cannot be Empty",
	    ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## PUT /products/:id

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login with admin role/"
}
```

_Request Body_

```
{
    (REQUIRED) "name": "Tas Merah",
    (REQUIRED) "image_url": "Gambar Tas Merah URL"
    (REQUIRED) "price": 25000
    (REQUIRED) "stock": 20
}
```

_Response (200 - Ok)_

```
{
    "id": 1,
    "title": "Tas Merah",
    "image_url": "Gambar Tas Merah URL",
    "price": "25000",
    "stock": "20"
    "updatedAt": "2020-12-01T09:19:36.583Z",
    "createdAt": "2020-12-01T09:19:36.583Z",
}
```

_Response (401 - Unauthorized - Logged In User Role not Admin)_

```
{
    "message": "Only Admin Who Have Authorization for this Action"
}
```

_Response (404 - Not Found - Product's Id Not Found)_

```
{
    "message": "Product Not Found"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (400 - Bad Request - Edit Attributes Cannot be Empty)_

```
{
    "message": [
			"Product's Name Cannot be Empty",
			"Product's Image Cannot be Empty",
			"Product's Price Cannot be Empty",
		    "Product's Stock Cannot be Empty",
	    ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## PATCH /products/:id

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login with admin role/"
}
```

_Request Body_

```
{
    (REQUIRED) "stock": "10"
}
```

_Response (200 - Ok)_

```
{
    "id": 1,
    "title": "Tas Merah",
    "image_url": "Gambar Tas Merah URL",
    "price": "25000",
    "stock": "10"
    "updatedAt": "2020-12-01T09:19:36.583Z",
    "createdAt": "2020-12-01T09:19:36.583Z",
}
```

_Response (401 - Unauthorized - Logged In User Role not Admin)_

```
{
    "message": "Only Admin Who Have Authorization for this Action"
}
```

_Response (404 - Not Found - Product's Id Not Found)_

```
{
    "message": "Product Not Found"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (400 - Bad Request - Stock Cannot be Empty)_

```
{
    "message": "Stock Cannot be Empty"
}
```

_Response (400 - Bad Request - Stock Cannot be Less than Zero)_

```
{
    "message": "Stock cannot Less Than Zero"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## DELETE /products/:id

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login with admin role/"
}
```

_Response (200 - Ok)_

```
{
    "message": "Product Deleted"
}
```

_Response (401 - Unauthorized - Logged In User Role not Admin)_

```
{
    "message": "Only Admin Who Have Authorization for this Action"
}
```

_Response (404 - Not Found - Product's Id Not Found)_

```
{
    "message": "Product Not Found"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## GET /carts

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
{
    "data": [
        {
            "id": 5,
            "UserId": 2,
            "ProductId": 3,
            "quantity": 2,
            "createdAt": "2020-12-15T03:35:00.531Z",
            "updatedAt": "2020-12-15T04:03:58.225Z",
            "Product": {
                "id": 3,
                "name": "Tas",
                "image_url": "https://dynamic.zacdn.com/SLyenzulb4AoJA92EOrAQsIVF5o=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/gykaco-8336-3190722-1.jpg",
                "price": 40000,
                "stock": 5,
                "createdAt": "2020-12-09T07:29:51.661Z",
                "updatedAt": "2020-12-10T03:05:52.284Z"
            }
        },
        {
            "id": 6,
            "UserId": 2,
            "ProductId": 4,
            "quantity": 4,
            "createdAt": "2020-12-15T04:04:04.162Z",
            "updatedAt": "2020-12-15T04:04:06.328Z",
            "Product": {
                "id": 4,
                "name": "Panci Mantap",
                "image_url": "https://id-test-11.slatic.net/shop/9d2ceaad1d4dcfc13ce909dce5ac0760.jpeg",
                "price": 35000,
                "stock": 4,
                "createdAt": "2020-12-09T13:48:08.957Z",
                "updatedAt": "2020-12-09T13:48:08.957Z"
            }
        }
    ],
    "total": 220000
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## POST /carts/:productId

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
{
    "response": {
        "id": 19,
        "UserId": 5,
        "ProductId": 5,
        "quantity": 2,
        "updatedAt": "2020-12-15T08:16:39.802Z",
        "createdAt": "2020-12-15T08:16:39.802Z"
    },
    "message": "Your Cart is Updated"
}
```

_Response (400 - Bad Request - Not Enough Stock)_

```
{
    "message": "This Products Stocks is Not Enough"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## PATCH /minusCart/:cartId

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
{
    "response": {
        "id": 6,
        "UserId": 2,
        "ProductId": 4,
        "quantity": 2,
        "createdAt": "2020-12-15T04:04:04.162Z",
        "updatedAt": "2020-12-15T08:34:15.271Z"
    },
    "message": "Your Cart is Updated"
}
```

_Response (404 - Not Found - Cart Not Found)_

```
{
    "message": "Cart Not Found"
}
```

_Response (400 - Bad Request - Quantity Cart on Minimum)_

```
{
    "message": "This Cart Quantity is Already One, Please use Remove Cart to Delete It
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## DELETE /deleteCart/:cartId

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
{
    "message": "This Item has Been Removed"
}
```

_Response (404 - Not Found - Cart Not Found)_

```
{
    "message": "Cart Not Found"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## GET /wishlists

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
{
    [
        {
            "id": 14,
            "UserId": 2,
            "ProductId": 3,
            "createdAt": "2020-12-15T04:54:35.946Z",
            "updatedAt": "2020-12-15T04:54:35.946Z",
            "Product": {
                "id": 3,
                "name": "Tas",
                "image_url": "https://dynamic.zacdn.com/SLyenzulb4AoJA92EOrAQsIVF5o=/fit-in/346x500/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/gykaco-8336-3190722-1.jpg",
                "price": 40000,
                "stock": 5,
                "createdAt": "2020-12-09T07:29:51.661Z",
                "updatedAt": "2020-12-10T03:05:52.284Z"
            }
        },
        {
            "id": 17,
            "UserId": 2,
            "ProductId": 5,
            "createdAt": "2020-12-15T07:16:53.114Z",
            "updatedAt": "2020-12-15T07:16:53.114Z",
            "Product": {
                "id": 5,
                "name": "Panci Merah",
                "image_url": "https://images.duniamasak.com/images/9568/panci-maxim-casablanca-dutch-oven-24-cm-20244_521.jpeg",
                "price": 105000,
                "stock": 12,
                "createdAt": "2020-12-09T13:49:53.634Z",
                "updatedAt": "2020-12-10T05:39:47.588Z"
            }
        }
    ]
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## POST /wishlists/:productId

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
{
    "message": "Success add this Product to Your Wishlist"
}
```

_Response (400 - Bad Request - Already Have this Wishlist)_

```
{
    "message": "You are Already Add This Product to Your Wishlist"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## DELETE /wishlists/:wishlishId

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
{
    "message": "Success Remove this Product from Your Wishlist"
}
```

_Response (404 - Not Found - Wishlist Not Found)_

```
{
    "message": "This Wishlist Not Found"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "Please Login First"
}
```

_Response (401 - Unauthorized - Invalid Access Token)_

```
{
    "message": "Invalid Account Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```
