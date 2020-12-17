const router = require('express').Router()
const AdminController = require('../controllers/AdminController')
const ProductController = require('../controllers/ProductController')
const CartController =  require('../controllers/CartController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.post('/login', AdminController.login)
router.post('/register', AdminController.register)
router.post('/loginUser', AdminController.loginUser)

router.get('/product', ProductController.readData)
router.use(authentication)
router.post('/product', authorization, ProductController.create)
router.get('/product/:id', authorization, ProductController.findData)
router.put('/product/:id', authorization, ProductController.editData)
router.delete('/product/:id',authorization, ProductController.deleteData)

router.get('/cart', CartController.readData)
router.post('/cart/:ProductId', CartController.createData)
router.patch('/cart/:CartId', CartController.updateData)
router.delete('/cart/:ProductId', CartController.deleteData)


module.exports = router