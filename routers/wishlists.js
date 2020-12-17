const router = require('express').Router()
const WishlistsController = require('../controllers/wishlistsController')
const authentication = require('../middlewares/authentication')
const {authorizationCustomer} = require('../middlewares/authorization')

router.use(authentication)
router.post('/', authorizationCustomer, WishlistsController.addWishlist)
router.get('/', authorizationCustomer, WishlistsController.listWishlists)
router.delete('/:id', authorizationCustomer, WishlistsController.deleteWishlist)

module.exports = router