const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const authentication = require('../middlewares/authentication')

router.use('/', userRouter)
router.use(authentication)
router.use('/products', productRouter)

module.exports = router