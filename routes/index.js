const express = require('express')
const route = express.Router()
const {UserController} = require('../controller')
const productRouter = require('./product')
const authentication = require('../middleware/authentication')

route.post('/adminLogin', UserController.adminLogin)
route.use(authentication)
route.use('/products', productRouter)

module.exports = route