const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

router.use(authentication.user)
router.get('/', CartController.showCart)
router.post('/', CartController.addToCart)
router.patch('/:id', CartController.updateMount)
router.delete('/:id', CartController.deleteItem)

module.exports = router