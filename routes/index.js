const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const bannerRouter = require('./banner')

router.use('/', userRouter)
router.use('/products', productRouter)
router.use('/banners', bannerRouter)

module.exports = router