const routes = require('express').Router()
const { Router } = require('express')
const {CartController} = require('../controller')
const authentication = require('../middleware/authentication')


routes.use(authentication)
routes.get('/', CartController.getCart)
routes.post('/:id', CartController.addCart)
routes.patch('/:cartId', CartController.editQuantity)
routes.delete('/:cartId', CartController.destroyCart)




module.exports = routes