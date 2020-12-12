const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', CartController.list)
router.post('/', CartController.add)
router.delete('/:id', CartController.deleteCart)

module.exports = router