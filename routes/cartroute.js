const cart = require('express').Router()
const CartController = require('../controllers/cartcontroller')
const { Auth } = require('../middlewares')

cart.use(Auth.authentication)
cart.get('/', CartController.showCart)
cart.put('/checkout', CartController.checkoutCart)
cart.post('/:productid', CartController.addToCart)

cart.use('/:id', Auth.authorizeCustomer)
cart.put('/:id', CartController.updateCart)
cart.delete('/:id', CartController.removeCart)

module.exports = cart