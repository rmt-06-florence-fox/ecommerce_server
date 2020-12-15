const router = require('express').Router()
const UserController = require('../controllers/userController')
const productRouter = require('./productRouter')
const customerRouter = require('./customerRouter')
const cartRouter = require('./cartRouter')

router.post('/admin/login', UserController.loginAdmin)  
router.use('/customer', customerRouter)
router.use('/carts', cartRouter)
router.use('/products', productRouter)

module.exports = router