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
* > https://e-commerce-server-p2.herokuapp.com/login
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
* > https://e-commerce-server-p2.herokuapp.com/product
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
* > https://e-commerce-server-p2.herokuapp.com/product
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
* > https://e-commerce-server-p2.herokuapp.com//product/:id
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
> https://e-commerce-server-p2.herokuapp.com//product/:id
* **Method:**
* > put
* **URL Params**
* id = [integer]

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