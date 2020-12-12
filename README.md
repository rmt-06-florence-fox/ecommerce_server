# ecommerce_server
# LINK
server: https://jejualan.herokuapp.com

client: https://jejualan-kw.web.app

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
## Request Headers
acces_token
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
## Response Fail not Login
response(401)
you must login first

response(401)
Your Session Is Time Up
## Response Error from Server
response(500)
oops sorry, it seems any problem from server

# Show Product By Id /product/:id GET
## Request Params
id
## Request Headers
acces_token
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