const router = require('express').Router()
const { CartController } = require('../controllers')
const Authentication = require('../middlewares/authentication')

router.use(Authentication.customerAuthentication)
router.post('/:productId', CartController.addUpdateCart)
router.get('/', CartController.showCart)
router.delete('/:id', CartController.removeCart)
// router.get('/checkout', CartController.checkout)

module.exports = router