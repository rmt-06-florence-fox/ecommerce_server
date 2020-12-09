const router = require('express').Router()
const UserController = require('../controllers/userController')
const productRouter = require('./productRouter')
const ProductController = require('../controllers/productController')

router.get('/products', ProductController.getAllProduct)
router.post('/login', UserController.loginAdmin)  
//--- ditambah login cust, regist cust
router.use('/products', productRouter)

module.exports = router