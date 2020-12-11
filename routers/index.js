const router = require('express').Router()
const user = require ('./router-user')
const product = require ('./router-product')
const category = require ('./router-category')
const authentication = require ('../middlewares/authentication')
const banner = require ('./router-banner')

router.use('/', user)
router.use(authentication)
router.use('/product', product)
router.use('/categories', category)
router.use('/banner', banner)



module.exports = router