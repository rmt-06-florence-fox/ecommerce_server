const express = require('express')
const route = express.Router()
const {UserController} = require('../controller')
const productRouter = require('./product')
const cartRouter = require('./cart')
const wishlistRouter = require('./wishlist')
const checkoutRouter = require('./checkout')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.use('/products', productRouter)
route.use('/carts', cartRouter)
route.use('/wishlists', wishlistRouter)
route.use('/checkout', checkoutRouter)


module.exports = route