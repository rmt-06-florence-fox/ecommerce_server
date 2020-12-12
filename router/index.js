const router = require('express').Router()
const UserController = require('../controllers/user')
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.post('/login', UserController.login)

router.use(authentication)

router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getProductById)
router.post('/products', authorization, ProductController.addProduct)
router.put('/products/:id', authorization, ProductController.editProduct)
router.delete('/products/:id', authorization, ProductController.deleteProduct)


module.exports = router