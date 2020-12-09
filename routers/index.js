const router = require('express').Router()
const user = require ('./router-user')
const product = require ('./router-product')
const category = require ('./router-category')
const authentication = require ('../middlewares/authentication')

router.use('/', user)
router.use(authentication)
router.use('/product', product)
router.use ('/categories', category)


module.exports = router