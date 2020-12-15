const CartRouter = require('../controllers/cartRouter')

const route = require('express').Router()

route.get('/', CartRouter.getCart)
route.post('/', CartRouter.addCart)
route.patch('/:id', CartRouter.editQuantity)
route.delete('/:id', CartRouter.deleteFromCart)

module.exports = route