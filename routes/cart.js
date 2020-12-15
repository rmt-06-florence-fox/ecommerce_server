const router = require('express').Router()
const { CartController } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/:productId', CartController.addUpdateCart)
router.get('/', CartController.showCart)
router.delete('/:id', CartController.removeCart)

module.exports = router