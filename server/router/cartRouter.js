const router = require('express').Router()
const CartController = require('../controller/Cart')
const authorisCart = require('../middlewares/autorisCart')
const authorisCust = require('../middlewares/authorisCust')

router.use(authorisCust)

router.get('/carts', CartController.find)
router.post('/carts', CartController.add)
router.patch('/carts/checkout', CartController.checkout)
router.patch('/carts/:id', authorisCart,CartController.patch)
router.delete('/carts/:id', authorisCart,CartController.delete)

module.exports = router