const router = require('express').Router()
const user = require ('./router-user')
const product = require ('./router-product')
const category = require ('./router-category')
const authentication = require ('../middlewares/authentication')
const banner = require ('./router-banner')
const cart = require ('../routers/router-cart')

router.use('/', user)
router.use('/product', product)
// router.use(authentication)
router.use('/categories', category)
router.use('/banner', banner)
router.use('/cart', cart)




module.exports = router