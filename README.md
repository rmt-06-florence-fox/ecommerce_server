# kanban-app
**User Login**
----
  Login to app as a user.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `email=[string] -- format email`

   `password=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"access_token"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": "Invalid Account"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": ["Email and Password are required!!"]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`
---
<br>

**Google Login**
----
  Login to app using a Google Account.

* **URL**

  /googleLogin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `username=[string] -- format email (email akun google)`

   `password=[string] -- password akun google`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": "access_token", "name"}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Intenal Server Error"}`
---
<br>

**Add Category**
----
  Add a category with a account user.

* **URL**

  /category

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `name=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{"message": "Category successfully created!!"}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Name is required!!"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Internal Server Error"}`

---
<br>

**Add Task**
----
  Add a task with a account user.

* **URL**

  /task

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `title=[string]`

   `due_date=[text]`

   `CategoryId=[integer]`

   `UserId=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message: 'Create Task Successful!!'}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{"message": "Please enter your title!!"}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": "Internal Server Error"}`

---
<br>

**Get Task**
----
  Fetch task data.

* **URL**

  /task

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 10,
        "title": "mengerjakan vue js",
        "due_date": "2020-12-21",
        "status": "pending",
        "UserId": 1, ...`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": ["Please login first!!"]}`

  OR

  * **Code:** 404 DATA NOT FOUND <br />
    **Content:** `{"message": ["Data not found"]}`

OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`

---
<br>

**Update Data Task**
----
  Update data task.

* **URL**

  /task/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**

   `title=[string]`

   `due_date=[date]`

   `CategoryId=[integer]`

* **Data Params**

  `access_token=[string]`

  `ID=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": ["Data updated successful!!"]}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": ["Please login first!!"]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`

---
<br>

**Delete Task**
----
  Delete a data task.

* **URL**

  /task/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

  `ID=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": ["Data deleted successful!!"]}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": ["Please login first!!"]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`


---
<br>

**Get Category**
----
  Get data category.

* **URL**

  /category

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

* **Data Params**

  `access_token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 13,
        "name": "done",
        "createdAt": "2020-12-02T14:08:37.690Z",
        "updatedAt": "2020-12-02T14:08:37.690Z"
    }, ...`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message": ["Please login first!!"]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{"message": ["Intenal Server Error"]}`

link firebase:
https://kanbanit-app.web.app/