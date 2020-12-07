# E-Commerce CMS - API-Documentation with Markdown

### Updated on 08 December 2020, 01:46AM GMT+07:00

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

_Response (400 - Bad Request - Invalid Account or Password)_

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

## GET /products

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login with any role/"
}
```

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

_Response (404 - Not Found - Invalid Access Token)_

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

_Response (404 - Not Found - Invalid Access Token)_

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

_Response (404 - Not Found - Invalid Access Token)_

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

_Response (404 - Not Found - Invalid Access Token)_

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

_Response (404 - Not Found - Invalid Access Token)_

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
