# **ECOMMERCE APP**
___

## **End Point**
___
* **URL**
* **Method:**
* **URL Params**
>**Required**

* **Data Params**
* **Success Response**
- * **code:**
- * **content:**
* **Error Response**
- * **code:**
- * **content:**
 
* **Sample Call**

## **login**
___
* **URL:**
* > localhost:3000/login
* **Method:**
* > POST
* **Data Params:**
* > email : [string]
password : [string]
* **Success Response**
- * **code:200**
- * **content:**
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNzU2NTA5OX0.OQhSK2tZQIjJAii2QtGb_EgXOB8rLSWEDTp0_xU2370"
}
```
* **Error Response**
- * **code:400**
- * **content:**
 ```
 {
     msg: wrong email/password
 }
 ```
 - * **code:500**
- * **content:**
 ```
 {
     msg: internal server error
 }
 ```
## **Get all product data**
___
* **URL**
* > localhost:3000/product
* **Method: GET**
* **Headers :**
* > access_token = [string]
* **Success Response**
- * **code:200**
- * **content:**
```
{
    "data": [
        {
            "id": 7,
            "name": "kambing",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg",
            "price": 1000000,
            "stock": 4,
            "createdAt": "2020-12-09T03:12:30.849Z",
            "updatedAt": "2020-12-09T03:12:30.849Z"
        },
        {
            "id": 20,
            "name": "komodo",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Komodo_dragon_%28Varanus_komodoensis%29.jpg/1200px-Komodo_dragon_%28Varanus_komodoensis%29.jpg",
            "price": 50000000,
            "stock": 2,
            "createdAt": "2020-12-09T16:14:52.017Z",
            "updatedAt": "2020-12-09T16:14:52.017Z"
        },
        {
            "id": 16,
            "name": "sapi betina",
            "image_url": "https://duniasapi.com/media/k2/items/cache/75b44b0e9c2e5d305fa323c6c51d3476_Generic.jpg",
            "price": 50000000,
            "stock": 10,
            "createdAt": "2020-12-09T16:14:52.017Z",
            "updatedAt": "2020-12-10T00:52:15.342Z"
        },
        {
            "id": 22,
            "name": "ikan cupang",
            "image_url": "https://analisa.id/wp-content/uploads/2020/08/ikan-cupang.jpg",
            "price": 20000,
            "stock": 2,
            "createdAt": "2020-12-10T01:38:47.166Z",
            "updatedAt": "2020-12-10T01:38:47.166Z"
        },
        {
            "id": 23,
            "name": "sapi putih ",
            "image_url": "https://4.bp.blogspot.com/-nse9Cs7yNQs/VymriUFbbZI/AAAAAAAAAFc/Sa9qd-SyjQYkQu40NdVfA8EHsMWM377jgCLcB/s1600/Sapi%2BPO.jpg",
            "price": 500,
            "stock": 2,
            "createdAt": "2020-12-10T01:43:22.093Z",
            "updatedAt": "2020-12-10T01:43:22.093Z"
        }
    ]
}
```
* **Error Response**
- * **code:401**
- * **content:**
```
{
    "msg": "please login"
}
```
- * **code:500**
- * **content:**
```
{
    "msg": "internal server eror"
}
```

## **ADD NEW PRODUCT**
___
* **URL**
* > localhost:3000/product
* **Method:**
* > POST
* **Headers:**
* > access_token = [string]
* **Data Params**
* >         name = [string]
            image_url = [string],
            price = [integer],
            stock =  [integer]
* **Success Response**
- * **code:201**
- * **content:**
```
{
    "id": 24,
    "name": "kuda",
    "image_url": "https://static.republika.co.id/uploads/images/inpicture_slide/hewan-kuda-_190731115427-331.jpg",
    "price": 500,
    "stock": 2,
    "updatedAt": "2020-12-10T03:44:37.690Z",
    "createdAt": "2020-12-10T03:44:37.690Z"
}
```
* **Error Response**
- * **code:401**
- * **content:**
```
{
    "msg": "please login"
}
```
- * **code:401**
- * **content:**
```
{
    "msg": "Unauthorize access"
}
```
- * **code:500**
- * **content:**
```
{
    "msg": "internal server eror"
}
```

## **Delete Product**
___
* **URL**
* > localhost:3000/product/:id
* **Method:**
* > delete
* **URL Params**
* > id = [integer]

* **Success Response**
- * **code:200**
- * **content:**
```
{
    "message": "succes delete product"
}
```
* **Error Response**
- * **code:401**
- * **content:**
```
{
    "msg": "please login"
}
```
- * **code:401**
- * **content:**
```
{
    "msg": "Unauthorize access"
}
```
- * **code:500**
- * **content:**
```
{
    "msg": "internal server eror"
}
```
## **Replace product**
___
* **URL**
> localhost:3000/product/:id
* **Method:**
* > put
* **URL Params**
* id = [integer]
* **Headers**
* > access_token = [string]
* **Data Params**
* >name = [string]
            image_url = [string],
            price = [integer],
            stock =  [integer]
* **Success Response**
- * **code:200**
- * **content:**
```
{
    "msg": "Succes modified"
}
```
* **Error Response**
- * **code:401**
- * **content:**
```
{
    "msg": "please login"
}
```
- * **code:401**
- * **content:**
```
{
    "msg": "Unauthorize access"
}
```
- * **code:500**
- * **content:**
```
{
    "msg": "internal server eror"
}
```
## **Register new customer**
___
* **URL**
> localhost:3000/register
* **Method:**
* > post

* **Data Params**
* >email = [string]
            password = [string],
* **Success Response**
- * **code:200**
- * **content:**
```
{
    "id": 11,
    "email": "cust7@mail.com"
}
```
* **Error Response**
- * **code:401**
- * **content:**
```
{
    "msg": "please login"
}
```
- * **code:400**
- * **content:**
```
{
    "msg": "email must be unique"
}
```
- * **code:500**
- * **content:**
```
{
    "msg": "internal server eror"
}
```
## **Add to cart**
___
* **URL**
> http://localhost:3000/cart/:id
* **Method:**
* > POST
* **URL Params**
* id = [integer] <<< Product Id
* **Headers**
* > access_token = [string]
* **Success Response**
- * **code:200**
- * **content:**
```
{
    "id": 6,
    "ProductId": 4,
    "UserId": 7,
    "quantity": 2,
    "createdAt": "2020-12-16T12:49:50.729Z",
    "updatedAt": "2020-12-16T22:36:16.113Z"
}
```
* **Error Response**
- * **code:401**
- * **content:**
```
{
    "msg": "please login"
}
```
- * **code:401**
- * **content:**
```
{
    "msg": "Unauthorize access"
}
```
- * **code:500**
- * **content:**
```
{
    "msg": "internal server eror"
}
```
## **Get User Cart**
___
* **URL**
> http://localhost:3000/cart
* **Method:**
* > GET
* **Headers**
* > access_token = [string]
* **Success Response**
- * **code:200**
- * **content:**
```
[
    {
        "id": 17,
        "ProductId": 1,
        "UserId": 5,
        "quantity": 2,
        "createdAt": "2020-12-16T21:43:38.332Z",
        "updatedAt": "2020-12-16T21:43:42.667Z",
        "Product": {
            "id": 1,
            "name": "sapi",
            "image_url": "https://duniasapi.com/media/k2/items/cache/75b44b0e9c2e5d305fa323c6c51d3476_Generic.jpg",
            "price": 50000000,
            "stock": 10,
            "createdAt": "2020-12-16T07:29:38.710Z",
            "updatedAt": "2020-12-16T07:29:38.710Z"
        }
    },
    {
        "id": 15,
        "ProductId": 2,
        "UserId": 5,
        "quantity": 2,
        "createdAt": "2020-12-16T21:43:36.385Z",
        "updatedAt": "2020-12-16T21:43:44.451Z",
        "Product": {
            "id": 2,
            "name": "kambing",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg",
            "price": 1000000,
            "stock": 4,
            "createdAt": "2020-12-16T07:29:38.710Z",
            "updatedAt": "2020-12-16T07:29:38.710Z"
        }
    },
    {
        "id": 16,
        "ProductId": 3,
        "UserId": 5,
        "quantity": 2,
        "createdAt": "2020-12-16T21:43:37.030Z",
        "updatedAt": "2020-12-16T21:43:45.754Z",
        "Product": {
            "id": 3,
            "name": "cupang",
            "image_url": "https://cdn.idntimes.com/content-images/post/20200914/59288fa35aa18aae47a459d2da9ee86e-8594da9da9d0305d2525c445f3bd48f4_600x400.jpg",
            "price": 50000,
            "stock": 5,
            "createdAt": "2020-12-16T07:29:38.710Z",
            "updatedAt": "2020-12-16T07:29:38.710Z"
        }
    }
]
```
* **Error Response**
- * **code:401**
- * **content:**
```
{
    "msg": "please login"
}
```
- * **code:401**
- * **content:**
```
{
    "msg": "Unauthorize access"
}
```
- * **code:500**
- * **content:**
```
{
    "msg": "internal server eror"
}
```
## **edit quantity**
___
* **URL**
> http://localhost:3000/cart/:cartId
* **Method:**
* > Patch
* **URL Params**
* id = [integer] <<< Product Id
* **Headers**
* > access_token = [string]
* **Data Params**
* >quantity = [integer]
* **Success Response**
- * **code:200**
- * **content:**
```
{
    "id": 5,
    "ProductId": 2,
    "UserId": 7,
    "quantity": 3,
    "createdAt": "2020-12-16T09:51:20.540Z",
    "updatedAt": "2020-12-16T22:39:52.994Z"
}
```
* **Error Response**
- * **code:400**
- * **content:**
```
{
    "msg": "wrong ammount of quantity"
}
```
- * **code:401**
- * **content:**
```
{
    "msg": "please login"
}
```
- * **code:401**
- * **content:**
```
{
    "msg": "Unauthorize access"
}
```
- * **code:500**
- * **content:**
```
{
    "msg": "internal server eror"
}
```
## **Delete cart**
___
* **URL**
> http://localhost:3000/cart/:cartId
* **Method:**
* > delete
* **URL Params**
* id = [integer] <<< Product Id
* **Headers**
* > access_token = [string]
* **Success Response**
- * **code:200**
- * **content:**
```
{
    "msg": "success delete cart"
}
```
* **Error Response**
- * **code:404**
- * **content:**
```
{
    "msg": "data not found"
}
- * **code:400**
- * **content:**
```
{
    "msg": "wrong ammount of quantity"
}
```
- * **code:401**
- * **content:**
```
{
    "msg": "please login"
}
```
- * **code:401**
- * **content:**
```
{
    "msg": "Unauthorize access"
}
```
- * **code:500**
- * **content:**
```
{
    "msg": "internal server eror"
}
```