const express = require('express')
const router = express.Router()
const {UserController, ProductController} = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post("/login", UserController.login)
router.use(authentication)
router.get("/products", ProductController.getItem)
router.post("/products", authorization, ProductController.addItem)
router.get("/products/:id", ProductController.getItemById)
router.put("/products/:id", authorization, ProductController.updateItem)
router.delete("/products/:id", authorization, ProductController.deleteItem)
module.exports = router