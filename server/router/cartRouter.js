const router = require('express').Router()
const CartController = require('../controller/Cart')
const authorisCart = require('../middlewares/autorisCart')
const authorisCust = require('../middlewares/authorisCust')

router.get('/carts', CartController.find)
// router.use(authorisCust)

router.post('/carts', CartController.add)
router.patch('/carts/checkout', CartController.checkout)
router.patch('/carts/:id', CartController.patch)
router.delete('/carts/:id', CartController.delete)

module.exports = router