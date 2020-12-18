
const route = require('express').Router()
const {WishlistController} = require('../controllers')
const authWishlist = require('../middlewares/authWishlist')
const authCustomer = require('../middlewares/authCustomer')

route.use(authCustomer)
route.get('/', WishlistController.findAllWishlists)
route.post('/:idProduct', WishlistController.addWishlist)
route.delete('/:id', authWishlist, WishlistController.delWishlist)

module.exports = route