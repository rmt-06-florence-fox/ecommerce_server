const cart = require('express').Router()
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')
const authorize = require('../middlewares/authorization')

cart.use(authentication)
cart.get('/', cartController.get)
cart.post('/', cartController.create)
cart.post('/checkout', cartController.checkout)
cart.put('/:id', cartController.update)
cart.delete('/:id', cartController.delete)

module.exports = cart