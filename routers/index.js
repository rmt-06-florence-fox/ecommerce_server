const express = require("express")
const router = express.Router()
const AdminController = require("../controllers/admin.js")
const ProductController = require("../controllers/product.js")
const authentication = require("../middlewares/authentication")
const adminRouter = require("./admin")



router.get("/products", ProductController.showAll)
router.use("/admin", adminRouter)


module.exports = router