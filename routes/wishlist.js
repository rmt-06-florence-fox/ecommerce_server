const express = require('express')
const route = express.Router()
const {WishlistController} = require('../controller')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorizationWishlist')

route.use(authentication)
route.get('/', WishlistController.readWishlist)
route.post('/:productId', WishlistController.createWishlist)
route.use('/:id', authorization)
route.delete('/:id', WishlistController.destroyWishlist)

module.exports = route