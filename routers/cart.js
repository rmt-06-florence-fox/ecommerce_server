const Controller = require('../controllers')

const routerCart = require('express').Router()
const ControllerCart = require('../controllers/cart')
const authentication = require('../middlewear/authentication')
const authorizeCustomer = require('../middlewear/authorizeCustomers')

routerCart.use(authentication)
routerCart.get('/', authorizeCustomer, ControllerCart.getCart)
routerCart.post('/add/:id', authorizeCustomer, ControllerCart.addToCart)
routerCart.delete('/:id', authorizeCustomer, ControllerCart.deleteCartItem)
routerCart.patch('/:id', authorizeCustomer, ControllerCart.updateProduct)

module.exports = routerCart