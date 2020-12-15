const router = require('express').Router()
const UserController = require('../controllers/userController')
const productRouter = require('./productRouter')
const customerRouter = require('./customerRouter')

router.post('/admin/login', UserController.loginAdmin)  
router.use('/customer', customerRouter)
router.use('/products', productRouter)

module.exports = router