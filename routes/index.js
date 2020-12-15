const express = require('express')
const route = express.Router()
const {UserController} = require('../controller')
const productRouter = require('./product')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.use('/products', productRouter)

module.exports = route