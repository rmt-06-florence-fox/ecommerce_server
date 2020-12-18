const router = require('express').Router()
const routeUsers = require('./users')
const routeProducts = require('./products')
const routeCarts = require('./carts')
const routeWishlists = require('./wishlists')
const ProductsController = require('../controllers/productsController')

router.get('/productsCustomer', ProductsController.listProducts)
router.use('/', routeUsers)
router.use('/products', routeProducts)
router.use('/carts', routeCarts)
router.use('/wishlist', routeWishlists)

module.exports = router