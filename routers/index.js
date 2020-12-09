const router = require('express').Router()
const routerProduct = require('./product')
const routerUser = require('./user')

router.use(routerUser)
router.use(routerProduct)

module.exports = router