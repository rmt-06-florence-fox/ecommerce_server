const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')

router.use('/products', productRouter)
router.use('/', userRouter)

module.exports = router