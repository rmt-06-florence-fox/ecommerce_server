const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const bannerRouter = require('./banner')

const customerRouter = require('./customer')
const cartRouter = require('./cart')

router.use('/', userRouter)
router.use('/products', productRouter)
router.use('/banners', bannerRouter)

router.use('/customers', customerRouter)
router.use('/carts', cartRouter)

module.exports = router