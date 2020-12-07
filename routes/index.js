const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")
const ProductController = require("../controllers/ProductController")
const authentication = require("../middlewares/authentication")


router.post("/login", UserController.login)
router.post("/product",authentication , ProductController.create)
router.put("/product/:id",authentication , ProductController.update)
router.delete("/product/:id",authentication , ProductController.delete)



module.exports = router