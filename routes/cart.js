const express = require('express')
const route = express.Router()
const {CartController} = require('../controller')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorizationCart')

route.use(authentication)
route.get('/', CartController.readCart)
route.post('/:productId', CartController.createCart)
route.use('/:id', authorization)
route.get('/:id', CartController.getListCart)
route.put('/:id/plus', CartController.plusCart)
route.put('/:id/minus', CartController.minusCart)
route.delete('/:id', CartController.destroyCart)

module.exports = route