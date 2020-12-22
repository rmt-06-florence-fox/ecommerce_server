const cart = require ('express').Router()
const authentication = require ('../middlewares/authentication')
const { ControllerCart } = require ('../controllers')


cart.use(authentication)
cart.get('/', ControllerCart.onCart)
cart.post('/checkout', ControllerCart.checkoutCart)
cart.post('/:id', ControllerCart.addToCart)
cart.delete('/:id', ControllerCart.deleteFromCart)

module.exports = cart