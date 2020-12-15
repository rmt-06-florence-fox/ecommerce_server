const router = require('express').Router()
const CartController = require('../controllers/CartController')
const authorCart = require('../middlewares/autorisCart')

router.use(authorizationCust)
router.get('/carts', CartController.find)
router.post('/carts', CartController.add)
router.patch('/carts/checkout', CartController.checkout)
router.patch('/carts/:id', authorCart, CartController.patch)
router.delete('/carts/:id', authorCart, CartController.delete)

module.exports = router