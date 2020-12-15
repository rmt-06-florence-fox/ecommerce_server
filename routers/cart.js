const express = require('express')
const route = express.Router()
const CartController = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const {authorizationCart} = require('../middlewares/authorization')


// authentication
route.use(authentication)
route.get('/',CartController.getCart)
route.get('/history',CartController.getHistory)
route.post('/checkout',CartController.checkout)
route.post('/:productId', CartController.postCart)

// authorization
route.patch('/:cartId', authorizationCart, CartController.patchCart)
route.delete('/:cartId', authorizationCart, CartController.deleteCart)


module.exports = route