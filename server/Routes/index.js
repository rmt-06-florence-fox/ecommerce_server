const express = require("express")
const router = express.Router()
const UserController = require("../Controllers/UserController")
const ProductController = require("../Controllers/ProductController")
const Authenticate = require("../middlewares/Authentication")
const Authorization = require("../middlewares/Authorized")

// Admin
router.post("/login/admin", UserController.loginAdmin)

// Customer
router.post("/register", UserController.register)
router.post("/login", UserController.loginCustomer)

router.get("/product", ProductController.getProduct)
router.get("/product/:id", ProductController.getOneProduct)

router.use(Authenticate)
router.post("/product", Authorization.adminAuthorization, ProductController.addProduct)
router.put("/product/:id", Authorization.adminAuthorization, ProductController.updateProduct)
router.delete("/product/:id", Authorization.adminAuthorization, ProductController.deleteProduct)

router.post("/charts/:idChart", ProductController.addChart)
router.get("/charts", ProductController.getAllChart)
router.patch("/increment/:idChart", ProductController.incrementChart)
router.patch("/decrement/:idChart", ProductController.decrementChart)
router.delete("/charts/:idChart", ProductController.deleteChart)

module.exports = router