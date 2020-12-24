const express = require("express")
const router = express.Router()
const ProductController = require("../controllers/product.js")
const adminRouter = require("./admin")
const customerRouter = require('./customer')



router.get("/products", ProductController.showAll)
router.use("/customer", customerRouter)
router.use("/admin", adminRouter)


module.exports = router