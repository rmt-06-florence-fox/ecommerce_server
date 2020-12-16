const router = require('express').Router()
const CartController = require('../controllers/cart-controller.js')
const customerAuthorzation = require('../middlewares/customer-authorization.js')

router.use('/:UserId', customerAuthorzation)
router.get('/:UserId', CartController.getMyCart)
router.post('/:UserId/:ProductId', CartController.addCart)
router.patch('/:UserId/:ProductId', CartController.alterQuantity)
router.delete('/:UserId/:id', CartController.deleteCart)

module.exports = router
