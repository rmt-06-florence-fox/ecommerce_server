const express = require('express')
const route = express.Router()
const {UserController} = require('../controller')
const productRouter = require('./product')
const cartRouter = require('./cart')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.use('/products', productRouter)
route.use('/carts', cartRouter)

module.exports = route