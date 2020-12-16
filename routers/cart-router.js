const router = require('express').Router()
const CartController = require('../controllers/cart-controller.js')
const customerAuthorization = require('../middlewares/customer-authorization.js')

router.get('/', CartController.getMyCart)
router.post('/', CartController.addCart)
router.use('/:id', customerAuthorization)
router.patch('/:id', CartController.alterQuantity)
router.delete('/:id', CartController.deleteCart)

module.exports = router
