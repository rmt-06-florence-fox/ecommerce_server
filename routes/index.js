var express = require('express')
const app = require('../app')
var router = express.Router()
const Controller = require('../controllers/controller')
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const errorHandler = require('../middlewares/errorHandler')


router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.get('/products', Controller.productList)

router.use(authentication)

router.post('/products', authorization, Controller.addProducts)
router.delete('/products/:id', authorization, Controller.deleteProduct)
router.patch('/products/:id', authorization, Controller.patchProduct)
router.get('/products/:id', Controller.oneProduct)
router.put('/products/:id', Controller.updateProduct)

router.post('/carts/:id', CartController.addCart)
router.get('/carts', CartController.getAllCart)
router.patch('/carts/:id', CartController.decrement)
router.delete('/carts/:id', CartController.deleteCart)

router.use(errorHandler)


module.exports = router