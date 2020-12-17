# ecommerce_server

**Register**


* **URL**

  <https://cms-server-arfafa.herokuapp.com/register_>

* **Method**

  POST

* **Data Params**

  * email
  
  * password

* **Success Response**
    
    ```json
    {
        "id": 1,
        "email": "arfafa@mail.com"
    }
    ```
* **Bad Response**

    if the email is not filled
    ```json
    {
        "msg": "Email can't be empty"
    }
    ```

    if the password is not filled
    ```json
    {
        "msg": "Password can't be empty"
    }
    ```

**Login Admin**

* **URL**

  <https://cms-server-arfafa.herokuapp.com/login/admin>

* **Method**

  POST

* **Data Params**

  * email
  
  * password

* **Success Response**
    
    ```json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmZhZmFAbWFpbC5jb20iLCJpYXQiOjE2MDcwODY5NzJ9.pUvjVReoFGfyQLNWb4tdNsKCBnItdWAhcNlcbnQjDe0"
    }
    ```
* **Bad Response**

    if the email or password is not filled
    ```json
    {
    "msg": "Invalid Account"
    }
    ```

**Login**

* **URL**

  <https://cms-server-arfafa.herokuapp.com/login/admin>

* **Method**

  POST

* **Data Params**

  * email
  
  * password

* **Success Response**
    
    ```json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcmZhZmFAbWFpbC5jb20iLCJpYXQiOjE2MDcwODY5NzJ9.pUvjVReoFGfyQLNWb4tdNsKCBnItdWAhcNlcbnQjDe0"
    }
    ```
* **Bad Response**

    if the email or password is not filled
    ```json
    {
    "msg": "Invalid Account"
    }
    ```

**POST Product**

* **URL**

  <https://cms-server-arfafa.herokuapp.com/product>

* **Method**

  POST

* **Headers**
  * access_token


* **Data Params**

  * name
  * image_url
  * price
  * stock

* **Success Response**
    
    ```json
    {
        "id": 1,
        "name": "jam",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/2/28/42908907/42908907_b1cc39e4-994a-47c8-8d74-3d32c4d69c44_700_700.jpg",
        "price": 710000,
        "stock": 10,
        "updatedAt": "2020-12-17T01:18:05.374Z",
        "createdAt": "2020-12-17T01:18:05.374Z"
    }
    ```
* **Bad Response**

    if name is not filled
    ```json
    {
    "msg": "name can't be empty"
    }
    ```

    if image is not filled
    ```json
    {
    "msg": "image_url can't be empty"
    }
    ```

    if price less than 10000
    ```json
    {
    "msg": "price minimun 10000"
    }
    ```

    if price is string
    ```json
    {
    "msg": "accepts only numbers"
    }
    ```

    if stock less than 5
    ```json
    {
    "msg": "stock min 5"
    }
    ```


**GET All Product**

* **URL**

  <https://cms-server-arfafa.herokuapp.com/product>

* **Method**

  GET

* **Params**
  * id

* **Success Response**
    
    ```json
    [
        {
            "id": 1,
            "name": "jam",
            "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/2/28/42908907/42908907_b1cc39e4-994a-47c8-8d74-3d32c4d69c44_700_700.jpg",
            "price": 710000,
            "stock": 10,
            "updatedAt": "2020-12-17T01:18:05.374Z",
            "createdAt": "2020-12-17T01:18:05.374Z"
        }
    ]
    ```

**GET One Product**

* **URL**

  <https://cms-server-arfafa.herokuapp.com/product/:id>

* **Method**

  GET
    
* **Params**
  * id

* **Success Response**
    
    ```json
    {
        "id": 1,
        "name": "jam",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/2/28/42908907/42908907_b1cc39e4-994a-47c8-8d74-3d32c4d69c44_700_700.jpg",
        "price": 710000,
        "stock": 10,
        "updatedAt": "2020-12-17T01:18:05.374Z",
        "createdAt": "2020-12-17T01:18:05.374Z"
    }
    ```

    * **Bad Response**

    if data not found
    ```json
    {
        "msg": "DataNotFound"
    }
    ```

**PUT Product**

* **URL**

  <https://cms-server-arfafa.herokuapp.com/product/:id>

* **Method**

  PUT

* **Headers**
  * access_token

* **Params**
  * id

* **Data Params**

  * name
  * image_url
  * price
  * stock

* **Success Response**
    
    ```json
    {
        "id": 1,
        "name": "Nasi Kuning",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/2/28/42908907/42908907_b1cc39e4-994a-47c8-8d74-3d32c4d69c44_700_700.jpg",
        "price": 710000,
        "stock": 10,
        "updatedAt": "2020-12-17T01:18:05.374Z",
        "createdAt": "2020-12-17T01:18:05.374Z"
    }
    ```
* **Bad Response**

    if name is not filled
    ```json
    {
    "msg": "name can't be empty"
    }
    ```

    if image is not filled
    ```json
    {
    "msg": "image_url can't be empty"
    }
    ```

    if price less than 10000
    ```json
    {
    "msg": "price minimun 10000"
    }
    ```

    if price is string
    ```json
    {
    "msg": "accepts only numbers"
    }
    ```

    if stock less than 5
    ```json
    {
    "msg": "stock min 5"
    }
    ```

    if data not found
    ```json
    {
        "msg": "DataNotFound"
    }
    ```

**DELETE Product**

* **URL**

  <https://cms-server-arfafa.herokuapp.com/product/:id>

* **Method**

  DELETE

* **Headers**
  * access_token

* **Params**
  * id

* **Success Response**
    
    ```json
    {
        "msg": "Success Deleted"
    }
    ```
* **Bad Response**

    if data not found
    ```json
    {
        "msg": "DataNotFound"
    }
    ```

**POST Chart**

If data available on database quantity will plus by 1, if not data will new create with quantity equal 1, and if quantity same or more than stock product, you cant add quantity again

* **URL**

  <https://cms-server-arfafa.herokuapp.com/charts>

* **Method**

  POST

* **Headers**
  * access_token


* **Data Params**

  * name
  * image_url
  * price
  * quantity

* **Success Response**
    
    ```json
    {
        "id": 1,
        "name": "Nasi Kuning",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/2/28/42908907/42908907_b1cc39e4-994a-47c8-8d74-3d32c4d69c44_700_700.jpg",
        "price": 710000,
        "quantity": 1,
        "updatedAt": "2020-12-17T01:18:05.374Z",
        "createdAt": "2020-12-17T01:18:05.374Z"
    }
    ```
* **Bad Response**

    if quantity same or more than stock product
    ```json
    {
    "msg": "tidak bisa melibihi batas maximum"
    }
    ```


**PATCH Increment Chart**

if want to adding quantity

* **URL**

  <https://cms-server-arfafa.herokuapp.com/charts>

* **Method**

  PATCH

* **Headers**
  * access_token

* **Params**
  * id

* **Success Response**
    
    ```json
    {
        "id": 1,
        "name": "Nasi Kuning",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/2/28/42908907/42908907_b1cc39e4-994a-47c8-8d74-3d32c4d69c44_700_700.jpg",
        "price": 710000,
        "quantity": 2,
        "updatedAt": "2020-12-17T01:18:05.374Z",
        "createdAt": "2020-12-17T01:18:05.374Z"
    }
    ```
* **Bad Response**

    if quantity same or more than stock product
    ```json
    {
    "msg": "tidak bisa melibihi batas maximum"
    }
    ```

**PATCH Decrement Chart**

if want to minus quantity

* **URL**

  <https://cms-server-arfafa.herokuapp.com/charts>

* **Method**

  PATCH

* **Headers**
  * access_token

* **Params**
  * id

* **Success Response**
    
    ```json
    {
        "id": 1,
        "name": "Nasi Kuning",
        "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/2/28/42908907/42908907_b1cc39e4-994a-47c8-8d74-3d32c4d69c44_700_700.jpg",
        "price": 710000,
        "quantity": 1,
        "updatedAt": "2020-12-17T01:18:05.374Z",
        "createdAt": "2020-12-17T01:18:05.374Z"
    }
    ```
* **Bad Response**

    if quantity same or less than 0
    ```json
    {
    "msg": "tidak bisa melibihi batas minimum"
    }
    ```

**GET All Chart**

* **URL**

  <https://cms-server-arfafa.herokuapp.com/charts>

* **Method**

  GET

* **Headers**
  * access_token

* **Success Response**
    
    ```json
    [
        {
            "id": 1,
            "name": "Nasi Kuning",
            "image_url": "https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2019/2/28/42908907/42908907_b1cc39e4-994a-47c8-8d74-3d32c4d69c44_700_700.jpg",
            "price": 710000,
            "quantity": 1,
            "updatedAt": "2020-12-17T01:18:05.374Z",
            "createdAt": "2020-12-17T01:18:05.374Z"
        }
    ]
    ```

**GET All Chart**

* **URL**

  <https://cms-server-arfafa.herokuapp.com/charts>

* **Method**

  GET

* **Params**
  
  id

* **Headers**
  * access_token

* **Success Response**
    
    ```json
    {
        "msg": "Success Deleted"
    }
    ```
* **Bad Response**

    if data not found
    ```json
    {
        "msg": "DataNotFound"
    }
    ```