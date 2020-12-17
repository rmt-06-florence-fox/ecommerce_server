const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
// const productController = require('../controllers/productController')

router.use('/', userRouter)
// router.use('/products', productController.showAll)

router.use('/products', productRouter)
router.use('/cart', cartRouter)




module.exports = router