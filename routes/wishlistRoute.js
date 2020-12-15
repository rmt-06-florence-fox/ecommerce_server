const WishlistController = require('../controllers/wishlishController')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

router.use(authentication.user)
router.get('/', WishlistController.getWishlish)
router.post('/', WishlistController.addToWishlist)
router.delete('/:id', WishlistController.deleteWishlist)

module.exports = router