const router = require('express').Router()
const { UserController, ProductController, CartController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/login', UserController.login)
router.post('/register', UserController.register) 
router.get('/products', ProductController.show)
router.get('/products/:id', ProductController.showById)

router.use(authentication)
router.post('/products', authorization, ProductController.input)
router.post('/carts', CartController.create)
router.get('/carts', CartController.fetchCarts)
router.delete('/carts/:id', CartController.deleteCarts)
router.put('/carts/:id', CartController.updateCarts)
router.put('/products/:id', authorization, ProductController.update)
router.delete('/products/:id', authorization, ProductController.delete)

module.exports = router