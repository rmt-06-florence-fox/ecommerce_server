const express = require("express")
const router = express.Router()
const UserController = require("../controllers/UserController")
const ProductController = require("../controllers/ProductController")
const CartController = require("../controllers/CartController")
const authentication = require("../middlewares/authentication")

router.get("/product",ProductController.showProduct)
router.post("/login", UserController.login)
router.post("/register", UserController.register)
router.post("/product",authentication , ProductController.create)
router.post("/cart",authentication , CartController.addProductCart)
router.put("/cart",authentication , CartController.UpdateCart)
router.get("/cart",authentication ,CartController.showProductCart)
router.delete("/cart",authentication ,CartController.removeProductCart)
router.put("/product/:id",authentication , ProductController.update)
router.delete("/product/:id",authentication , ProductController.delete)



module.exports = router