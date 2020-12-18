const router = require('express').Router()
const UserController = require('../controllers/user')
const ProductController = require('../controllers/product')
const CartController = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logincustomer', UserController.loginCustomer)

router.get('/products', ProductController.getProducts)

router.use(authentication)
router.get('/carts', CartController.getCarts)
router.post('/carts', CartController.addCart)
router.delete('/carts/:id', CartController.removeCart)
router.patch('/carts', CartController.updateCart)

router.get('/products/:id', ProductController.getProductById)
router.post('/products', authorization, ProductController.addProduct)
router.put('/products/:id', authorization, ProductController.editProduct)
router.delete('/products/:id', authorization, ProductController.deleteProduct)


module.exports = router