const router = require('express').Router()
const UserRouter = require('./user')
const ProductRouter = require('./product')

router.use('/', UserRouter )
router.use('/products', ProductRouter)


module.exports = router