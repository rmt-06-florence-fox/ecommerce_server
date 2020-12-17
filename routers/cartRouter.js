const router = require('express').Router()
const cartController = require ('../controllers/cartcontroller')
const {cartAuthentication, cartAuthorization} = require('../middleware/cartAuth')

router.use(cartAuthentication)

router.get('/', cartController.getCart)
router.post('/addCart', cartController.addCart)
router.delete('/:id', cartAuthorization, cartController.deleteCart)
router.delete('/items/:id', cartAuthorization, cartController.deleteItem)

router.post('/checkout/:id', cartAuthorization, cartController.checkout)
router.put('/editcart/:id', cartAuthorization, cartController.editCartQuantity)

module.exports = router