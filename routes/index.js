const express = require('express')
const route = express.Router()
const {UserController} = require('../controller')
const productRouter = require('./product')


route.post('/adminLogin', UserController.adminLogin)
route.use('/products', productRouter)

module.exports = route