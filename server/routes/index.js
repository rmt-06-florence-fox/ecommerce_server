const router = require("express").Router()
const user = require("./user")
const product = require("./product")
const cart = require('./cart')
const banner = require('./banner')

router.use("/", user)
router.use("/products", product)
router.use('/carts', cart)
router.use('/banner', banner)

module.exports = router

