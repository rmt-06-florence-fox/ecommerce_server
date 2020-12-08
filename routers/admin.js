const express = require("express")
const router = express.Router()
const AdminController = require("../controllers/admin.js")
const ProductController = require("../controllers/product.js")
const authentication = require("../middlewares/authentication")
const AdminAuthorizationCreate = require("../middlewares/authorizationCreate")
const authorizeAdminEditDelete = require("../middlewares/authorizationEditDelete")

router.post("/login", AdminController.login)


router.use(authentication)
router.use(AdminAuthorizationCreate)
router.post("/products", ProductController.addProduct)

router.use("/products/:id", authorizeAdminEditDelete)
router.put("/products/:id", ProductController.editProduct)
router.delete("/products/:id", ProductController.deleteProduct)

module.exports = router