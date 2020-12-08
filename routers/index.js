const express = require("express")
const router = express.Router()
const AdminController = require("../controllers/admin.js")
const ProductController = require("../controllers/product.js")
const authentication = require("../middlewares/authentication")
const adminRouter = require("./admin")


router.use("/admin", adminRouter)
router.use(authentication)
router.get("/products", ProductController.showAll)


module.exports = router