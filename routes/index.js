const router = require('express').Router()
const adminRoute = require('./adminroute')
const productRoute = require('./productroute')

router.use('/products', productRoute)
router.use('/admin', adminRoute)

module.exports = router