const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")
const ProductController = require("../controllers/ProductController")
const errorHandler = require("../middlewares/errorHandler")
const authentication = require("../middlewares/authentication")



router.use(errorHandler)
router.post("/login", UserController.login)
router.use(authentication)
router.post("/product/create", ProductController.create)




module.exports = router