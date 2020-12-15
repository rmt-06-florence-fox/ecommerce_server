const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middleware/authentication')
const authorizationCust = require('../middleware/authorizationCust')

router.use(authentication)
router.post('/:productId', CartController.addOrUpdateCart)
router.get('/', CartController.getCart)
router.patch('/checkout', CartController.checkout)
router.use('/:id', authorizationCust)
router.delete('/:id', CartController.deleteCart)

module.exports = router