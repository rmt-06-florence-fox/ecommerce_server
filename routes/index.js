const express = require('express')
const route = express.Router()
const {UserController, CheckoutController} = require('../controller')
const productRouter = require('./product')
const cartRouter = require('./cart')
const wishlistRouter = require('./wishlist')
const authentication = require('../middleware/authentication')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.use('/products', productRouter)
route.use('/carts', cartRouter)
route.use('/wishlists', wishlistRouter)
route.post('/checkout', authentication, CheckoutController.checkout)

module.exports = route