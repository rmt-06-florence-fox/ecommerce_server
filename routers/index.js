const router = require('express').Router()
const UserRouter = require('./userrouter')
const ProductRouter = require('./productrouter')
const BannerRouter = require('./bannerrouter')
const CartRouter = require('./cartRouter')
const CustomerRouter = require('./customerRouter')

router.use('/users', UserRouter)
router.use('/products', ProductRouter)
router.use('/banners', BannerRouter)

router.use('/customers', CustomerRouter)
router.use('/carts', CartRouter)

module.exports = router