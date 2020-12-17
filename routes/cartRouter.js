const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController.js')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', CartController.showCart)
router.post('/', CartController.addCart)
router.patch('/:id', CartController.updateQuantity)
router.delete('/:id', CartController.removeCart)

module.exports = router