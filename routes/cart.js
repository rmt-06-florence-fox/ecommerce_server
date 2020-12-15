const router = require('express').Router()
const CartController = require('../controller/cartController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const authorizationCart = require('../middleware/authorizationCart')
router.use(authentication)
router.get('/', CartController.getAll)
router.post('/', CartController.create)
router.patch('/', CartController.patch)
router.use('/:cartId',authorizationCart)
router.delete('/:cartId', CartController.remove)

module.exports = router