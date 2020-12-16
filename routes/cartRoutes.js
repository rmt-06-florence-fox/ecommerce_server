const routes = require('express').Router()
const {CartController} = require('../controller')
const authentication = require('../middleware/authentication')
const CustAuthorization = require('../middleware/CustAuthor')

routes.use(authentication)
routes.get('/', CartController.getCart)
routes.post('/:id', CartController.addCart)
routes.use('/:cartId', CustAuthorization)
routes.patch('/:cartId', CartController.editQuantity)
routes.delete('/:cartId', CartController.destroyCart)




module.exports = routes