const router = require('express').Router()
const UserRouter = require('./userrouter')
const ProductRouter = require('./productrouter')
const BannerRouter = require('./bannerrouter')

router.use('/users', UserRouter)
router.use('/products', ProductRouter)
router.use('/banners', BannerRouter)

module.exports = router