const route = require('express').Router()
const {CartController} = require('../controllers')
const authCustomer = require('../middlewares/authCustomer')
const authCart = require('../middlewares/authCart')

route.use(authCustomer)
route.get('/', CartController.fetchCartProduct)
route.put('/:idProduct', CartController.updateOrAddCart)
route.delete('/:idCart', authCart, CartController.delCartProduct)
route.patch('/', CartController.checkout)
module.exports = route