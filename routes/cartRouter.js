const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.post('/:productId', CartController.addOrUpdateCart)
module.exports = router