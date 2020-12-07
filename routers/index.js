const router = require('express').Router()
const routeUsers = require('./users')
const routeProducts = require('./products')

router.use('/', routeUsers)
router.use('/products', routeProducts)

module.exports = router