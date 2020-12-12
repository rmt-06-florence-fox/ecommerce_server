# JAM TANGEN CMS
Documentation for **JAM TANGEN**. A simple E-Commerce CMS web application.


# Link

#### Client
```
https://ecommerce-cms-wypratama.web.app/
https://ecommerce-cms-wypratama.firebaseapp.com/
```

#### Server
```
https://ecommerce-cms-wypratama.herokuapp.com/
```

##  API Documentation

`POST`   **/login**

`https://ecommerce-cms-wypratama.herokuapp.com/login`

| Body | |
|--|--|
| email| *admin@ecom.com*
| password| *123456* |

**Example**
*  **Status 200 OK**
	> {
    "access_token": "token string"
}
>
*  **400 Bad Request**
	>  {
"error":  "email / password don't match"
}
> 
---

`GET`   **/product**

`https://ecommerce-cms-wypratama.herokuapp.com/product`

| Headers| |
|--|--|
| access_token| "*token string*"

**Example**
* **Status 200 OK**
	>{
"products":  [
{
"id":  1,
"name":  "Jam Karet",
"image_url":  "https://images.unsplash.com/photo-1566879867438-db61e1390fb7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=888&q=80",
"price":  100000000,
"stock":  2,
"createdAt":  "2020-12-12T13:22:50.048Z",
"updatedAt":  "2020-12-12T17:23:26.531Z",
"Categories":  [
{
"id":  1,
"name":  "Jam Digital",
"createdAt":  "2020-12-12T13:10:06.416Z",
"updatedAt":  "2020-12-12T13:10:06.416Z",
"ProductCategory":  {
"ProductId":  1,
"CategoryId":  1,
"createdAt":  "2020-12-12T17:23:27.697Z",
"updatedAt":  "2020-12-12T17:23:27.697Z"
}
},
{
"id":  2,
"name":  "Jam Analog",
"createdAt":  "2020-12-12T13:10:06.416Z",
"updatedAt":  "2020-12-12T13:10:06.416Z",
"ProductCategory":  {
"ProductId":  1,
"CategoryId":  2,
"createdAt":  "2020-12-12T17:23:27.697Z",
"updatedAt":  "2020-12-12T17:23:27.697Z"
}
}
]
},
{
"id":  2,
"name":  "Tag Heuer Aquaracer 500",
"image_url":  "https://thumbs.dreamstime.com/z/tag-heuer-aquaracer-mens-divers-watches-rimini-italy-march-76083201.jpg",
"price":  37758050,
"stock":  12,
"createdAt":  "2020-12-12T17:42:52.771Z",
"updatedAt":  "2020-12-12T17:42:52.771Z",
"Categories":  [
{
"id":  2,
"name":  "Jam Analog",
"createdAt":  "2020-12-12T13:10:06.416Z",
"updatedAt":  "2020-12-12T13:10:06.416Z",
"ProductCategory":  {
"ProductId":  2,
"CategoryId":  2,
"createdAt":  "2020-12-12T17:42:53.478Z",
"updatedAt":  "2020-12-12T17:42:53.478Z"
}
},
{
"id":  3,
"name":  "Jam Mekanik",
"createdAt":  "2020-12-12T13:10:06.416Z",
"updatedAt":  "2020-12-12T13:10:06.416Z",
"ProductCategory":  {
"ProductId":  2,
"CategoryId":  3,
"createdAt":  "2020-12-12T17:42:53.478Z",
"updatedAt":  "2020-12-12T17:42:53.478Z"
}
}
]
}
]
}

*  **400 Bad Request**
	>{"error":"Need login to access"}
>

---

`POST`   **/product**

`https://ecommerce-cms-wypratama.herokuapp.com/product`

Creating product will return created product on success

| Headers| |
|--|--|
| access_token| "*token string*"

| Body| |
|--|--|
| name| "*For Testing*"
| image_url| "*https://ecommerce-cms-wypratama.firebaseapp.com/img/bg.3d94832d.jpg*"
| price| "*90000*"
| stock| "*2*"

**Example**
* **Status 200 OK**
	>  {"id":3,"name":"For Testing","image_url":"https://ecommerce-cms-wypratama.firebaseapp.com/img/bg.3d94832d.jpg","price":90000,"stock":2,"updatedAt":"2020-12-12T18:36:12.337Z","createdAt":"2020-12-12T18:36:12.337Z"}
* **400 Bad Request**
	>{"error":"Need login to access"}
* **500 Internal Server Error**
	>{"errors":["Stock can't be lower than 0"]}
* **500 Internal Server Error**
	>{"errors":["Price can't be lower than Rp 99"]}
* **500 Internal Server Error**
	>{"errors":["Stock can't be lower than 0","Price can't be lower than Rp 99"]}
* **400 Bad Request**
	>{"error":"Access admin only"}

---

`PUT`   **/product/:id**

`https://ecommerce-cms-wypratama.herokuapp.com/product/3`

Editing product with invalid data like stock lower than 0 or price lower than 99 will return same error as post product

| Headers| |
|--|--|
| access_token| "*token string*"

| Body| |
|--|--|
| name| "*For Testing Edited*"
| image_url| "*https://ecommerce-cms-wypratama.firebaseapp.com/img/bg.3d94832d.jpg*"
| price| "*90000*"
| stock| "*2*"

**Example**
* **Status 200 OK**
	>  {"updatedProduct":[1,[{"id":3,"name":"For Testing Edited","image_url":"https://ecommerce-cms-wypratama.firebaseapp.com/img/bg.3d94832d.jpg","price":90000,"stock":2,"createdAt":"2020-12-12T18:36:12.337Z","updatedAt":"2020-12-12T18:46:49.222Z"}]]}
* **400 Bad Request**
	>{"error":"Need login to access"}
* **400 Bad Request**
	>{"error":"Access admin only"}

---

`DELETE`   **/product/:id**

`https://ecommerce-cms-wypratama.herokuapp.com/product/3`

| Headers| |
|--|--|
| access_token| "*token string*"


**Example**
* **Status 200 OK**
	>  {"message":"item deleted"}
* **400 Bad Request**
	>{"error":"Need login to access"}
* **400 Bad Request**
	>{"error":"Access admin only"}


---

