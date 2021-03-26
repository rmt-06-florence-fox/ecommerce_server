const router = require('express').Router()
const UserRouter = require('./user')
const ProductRouter = require('./product')
const CartRouter = require('./cart')

router.use('/', UserRouter )
router.use('/products', ProductRouter)
router.use('/carts', CartRouter)

module.exports = router