const router = require('express').Router()
const customerRoute = require('./custroute')
const adminRoute = require('./adminroute')
const productRoute = require('./productroute')
const cartRoute = require('./cartroute')

router.use('/', customerRoute)
router.use('/admin', adminRoute)
router.use('/products', productRoute)
router.use('/cart', cartRoute)

module.exports = router