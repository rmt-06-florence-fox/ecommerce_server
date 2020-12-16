const express = require("express")
const router = express.Router()
const UserController = require('../controllers/customer')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authCust')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authentication)
router.use(authorization)
router.get('/carts', UserController.getCart) // ini route melihat shopping cart
router.post('/carts/:ProductId', UserController.addItemtoCart) // ini route menambah item ke shopping cart / menambah quantity item
router.patch('/carts/:ProductId', UserController.decreaseItemfromCart) // ini route mengurangi item pada shopping cart
router.get('/wishlist', UserController.getWishlist)
router.post('/wishlist/:ProductId', UserController.addWishlist)
router.delete('/wishlist/:ProductId', UserController.deleteWishlist)
module.exports = router