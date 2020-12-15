const route = require('express').Router()
const {CartController} = require('../controllers')
const authentication = require('../middlewares/authentication')
const authCustomer = require('../middlewares/authCustomer')

route.use(authentication)
route.get('/', CartController.fetchCartProduct)
route.post('/:idProduct', authCustomer, CartController.addToCart)
route.patch('/:idProduct', authCustomer,  CartController.updateQuantity)
route.delete('/:idProduct', authCustomer, CartController.delCartProduct)

module.exports = route