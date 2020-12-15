const CartRouter = require('../controllers/cartRouter')
const authenctication = require('../middleware/authentication')
const authorization = require('../middleware/CustomerAuthorization')
const route = require('express').Router()

route.use(authenctication)
route.get('/', CartRouter.getCart)
route.post('/', CartRouter.addCart)
route.patch('/:id', authorization, CartRouter.editQuantity)
route.delete('/:id', authorization, CartRouter.deleteFromCart)

module.exports = route