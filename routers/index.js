const router = require('express').Router()
const user = require ('./router-user')
const product = require ('./router-product')
const authentication = require ('../middlewares/authentication')

router.use('/', user)
router.use(authentication)
router.use('/product', product)


module.exports = router