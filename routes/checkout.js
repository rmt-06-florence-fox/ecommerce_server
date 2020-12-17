const express = require('express')
const route = express.Router()
const {CheckoutController} = require('../controller')
const authentication = require('../middleware/authentication')

route.use(authentication)
route.post('/', CheckoutController.checkout)
route.get('/', CheckoutController.listCheckout)

module.exports = route