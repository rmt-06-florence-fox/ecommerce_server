# ecommerce_server
# LINK
server: https://jejualan.herokuapp.com

client admin: https://jejualan-kw.web.app
client customor : https://jejualan-kw-super.web.app

More Docs: https://documenter.getpostman.com/view/13590085/TVmTcF8K

# LOGIN /login POST
## Request Body
email,
password,

## Response Success
response(201)
access_token

## Response Fail Login
response(401)
invalid account

response(401)
email or password invalid

## Response Error from Server
response(500)
oops sorry, it seems any problem from server

# CREATE /product POST
### Cannot Create when role is'nt admin!
## Request Headers
acces_token
## Request Body
name,
price,
stock,
image_url,

## Response Success
response(201)
{
  "id": 2,
  "name": "Gudang Garam",
  "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN",
  "price": 20000,
  "stock": 2000,
  "updatedAt": "2020-12-09T13:55:08.780Z",
  "createdAt": "2020-12-09T13:55:08.780Z"
}
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Fail from Validation
response(401)
<"message error validation">
## Response Fail if not Admin
response(401)
"You not admin!"
## Response Error from Server
response(500)
oops sorry, it seems any problem from server

# Show All Product /product GET
## Response Success
response(201)
[
  {
    "id": 2,
    "name": "Gudang Garam Surya",
    "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F811492426587180574%2F&psig=AOvVaw26JPyZcy6wRWkLoj8RtxNf&ust=1607445241963000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDzl6imvO0CFQAAAAAdAAAAABAN",
    "price": 24000,
    "stock": 2500,
    "createdAt": "2020-12-09T13:55:08.780Z",
    "updatedAt": "2020-12-09T14:01:37.599Z"
  }
]
## Response Error from Server
response(500)
oops sorry, it seems any problem from server

# Show Product By Id /product/:id GET
## Request Params
id
## Response Success
response(201)
{
  "id": 2,
  "name": "Gudang Garam",
  "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN",
  "price": 20000,
  "stock": 2000,
  "updatedAt": "2020-12-09T13:55:08.780Z",
  "createdAt": "2020-12-09T13:55:08.780Z"
}
## Response Not Found
response(404)
data not found
## Response Error from Server
response(500)
oops sorry, it seems any problem from server


# Update Product /product/:id PUT
### Cannot Update when role is'nt admin!
## Request Params
id
## Request Headers
acces_token
## Request Body
name,
price,
stock,
image_url,

## Response Success
response(201)
{
  "id": 2,
  "name": "Gudang Garam",
  "image_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.logolynx.com%2Ftopic%2Fgudang%2Bgaram&psig=AOvVaw3WWn7hCG8Mj2gBQ25W8fqy&ust=1607435942181000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjA8dWDvO0CFQAAAAAdAAAAABAN",
  "price": 20000,
  "stock": 2000,
  "updatedAt": "2020-12-09T13:55:08.780Z",
  "createdAt": "2020-12-09T13:55:08.780Z"
}
## Response Not Found
response(404)
data not found
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Fail from Validation
response(401)
<"message error validation">
## Response Fail if not Admin
response(401)
"You not admin!"
## Response Error from Server
response(500)
oops sorry, it seems any problem from server

# Delete Product /product/:id DELETE
### Cannot Delete when role is'nt admin!
## Request Params
id
## Request Headers
acces_token

## Response Success
response(201)
Product succes to delete
## Response Not Found
response(404)
data not found
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Fail if not Admin
response(401)
"You not admin!"
## Response Error from Server
response(500)
oops sorry, it seems any problem from server

# Show All Cart have user /cart GET
## Request Headers
acces_token
## Response Success
response(201)
{
    "totalPrice": 48000,
    "cart": [
        {
            "id": 11,
            "UserId": 2,
            "ProductId": 1,
            "status": false,
            "quantity": 2,
            "createdAt": "2020-12-17T00:50:23.984Z",
            "updatedAt": "2020-12-17T00:50:26.859Z",
            "User": {
                "id": 2,
                "email": "icih@mail.com",
                "password": "$2b$10$3llLiDBDaHeexIlClm6b8eciPnuXD4nhAphjknbLK9jCaW6gKswhy",
                "role": "customer",
                "createdAt": "2020-12-16T22:16:21.690Z",
                "updatedAt": "2020-12-16T22:16:21.690Z"
            },
            "Product": {
                "id": 1,
                "name": "Gudang Garam Surya",
                "image_url": "http://....",
                "price": 24000,
                "stock": 2500,
                "createdAt": "2020-12-16T22:18:48.235Z",
                "updatedAt": "2020-12-16T22:31:08.848Z"
            }
        }
    ]
}
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Error from Server
response(500)
oops sorry, it seems any problem from server


# CREATE /cart POST
## Request Headers
acces_token
## Request Body
ProductId

## Response Success
response(201)
{
    "id": 18,
    "UserId": 3,
    "ProductId": 2,
    "quantity": 2,
    "status": false,
    "createdAt": "2020-12-16T17:00:34.344Z",
    "updatedAt": "2020-12-16T17:26:16.392Z"
}
## Response if ProductId not found
response(404)
data not found
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Fail from Validation
response(401)
<"message error validation">
## Response Error from Server
response(500)
oops sorry, it seems any problem from server


# Update Quantity /cart PATCH
## Request Headers
acces_token
## Request Body
ProductId
quantity

## Response Success
response(201)
{
    "id": 18,
    "UserId": 3,
    "ProductId": 2,
    "quantity": 3,
    "status": false,
    "createdAt": "2020-12-16T17:00:34.344Z",
    "updatedAt": "2020-12-16T17:26:16.392Z"
}
## Response quantity more than stock product or less than equal 0
response(401)
Stock not already yet


response(401)
Quantity cannot 0
## Response if ProductId not found
response(404)
data not found
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Fail from Validation
response(401)
<"message error validation">
## Response Error from Server
response(500)
oops sorry, it seems any problem from server


# Show Cart By Id /cart/:cartId GET
## Request Params
cartId
## Request Headers
acces_token
## Response Success
response(201)
{
    "id": 18,
    "UserId": 3,
    "ProductId": 2,
    "quantity": 3,
    "status": false,
    "createdAt": "2020-12-16T17:00:34.344Z",
    "updatedAt": "2020-12-16T17:26:16.392Z"
}
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Not Found
response(404)
data not found
## Response Error from Server
response(500)
oops sorry, it seems any problem from server


# Remove Cart By Id /cart/:cartId DELETE
## Request Params
cartId
## Request Headers
acces_token
## Response Success
response(201)
Cart success to delete
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Not Found
response(404)
data not found
## Response Error from Server
response(500)
oops sorry, it seems any problem from server


# Checkout Cart /cart/checkout PATCH

## Request Headers
acces_token

## Response Success
[
    [
        1,
        [
            {
                "id": 1,
                "name": "Gudang Garam Surya",
                "image_url": "http://..sl",
                "price": 24000,
                "stock": 2468,
                "createdAt": "2020-12-16T22:18:48.235Z",
                "updatedAt": "2020-12-17T04:15:02.981Z"
            }
        ]
    ],
    [
        1,
        [
            {
                "id": 37,
                "UserId": 4,
                "ProductId": 1,
                "status": true,
                "quantity": 2,
                "createdAt": "2020-12-17T04:14:41.780Z",
                "updatedAt": "2020-12-17T04:15:03.013Z"
            }
        ]
    ],
    [
        1,
        [
            {
                "id": 3,
                "name": "Softex",
                "image_url": "http://dege",
                "price": 3000,
                "stock": 1980,
                "createdAt": "2020-12-17T02:17:24.404Z",
                "updatedAt": "2020-12-17T04:15:03.014Z"
            }
        ]
    ],
    [
        1,
        [
            {
                "id": 38,
                "UserId": 4,
                "ProductId": 3,
                "status": true,
                "quantity": 2,
                "createdAt": "2020-12-17T04:14:44.657Z",
                "updatedAt": "2020-12-17T04:15:03.015Z"
            }
        ]
    ]
]
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Error from Server
response(500)
oops sorry, it seems any problem from server


# Show All history checkout have user /cart/history GET
## Request Headers
acces_token
## Response Success
response(201)
{
    "totalPrice": 48000,
    "cart": [
        {
            "id": 11,
            "UserId": 2,
            "ProductId": 1,
            "status": true,
            "quantity": 2,
            "createdAt": "2020-12-17T00:50:23.984Z",
            "updatedAt": "2020-12-17T00:50:26.859Z",
            "User": {
                "id": 2,
                "email": "icih@mail.com",
                "password": "$2b$10$3llLiDBDaHeexIlClm6b8eciPnuXD4nhAphjknbLK9jCaW6gKswhy",
                "role": "customer",
                "createdAt": "2020-12-16T22:16:21.690Z",
                "updatedAt": "2020-12-16T22:16:21.690Z"
            },
            "Product": {
                "id": 1,
                "name": "Gudang Garam Surya",
                "image_url": "http://....",
                "price": 24000,
                "stock": 2500,
                "createdAt": "2020-12-16T22:18:48.235Z",
                "updatedAt": "2020-12-16T22:31:08.848Z"
            }
        }
    ]
}
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Error from Server
response(500)
oops sorry, it seems any problem from server
