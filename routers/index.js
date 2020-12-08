const express = require("express")
const router = express.Router()
const AdminController = require("../controllers/admin.js")
const ProductController = require("../controllers/product.js")
const authentication = require("../middlewares/authentication")
const adminAuthorization = require("../middlewares/authorizationCreate")

router.post("/login", AdminController.login)
router.use(authentication)
router.get("/products", ProductController.showAll)

router.use(adminAuthorization)
router.post("/products", ProductController.addProduct)

module.exports = router