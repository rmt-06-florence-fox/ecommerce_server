const router = require('express').Router()
const WishlistsController = require('../controllers/wishlistsController')

router.post('/', WishlistsController.addWishlist)
router.get('/', WishlistsController.listWishlists)
router.delete('/:id', WishlistsController.deleteWishlist)

module.exports = router