const express = require("express")
const router = express.Router()
const UserController = require("../Controllers/UserController")
const ProductController = require("../Controllers/ProductController")
const Authenticate = require("../middlewares/Authentication")
const Authorization = require("../middlewares/Authorized")

router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.use(Authenticate)
router.get("/product", ProductController.getProduct)
router.get("/product/:id", ProductController.getOneProduct)

router.use(Authorization)
router.post("/product", ProductController.addProduct)
router.put("/product/:id", ProductController.updateProduct)
router.delete("/product/:id", ProductController.deleteProduct)

module.exports = router