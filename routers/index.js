const router = require('express').Router()
const Controller = require('../controllers')
const routerProduct = require('./product')
const routerUser = require('./user')

router.get('/', Controller.home)
router.use(routerUser)
router.use(routerProduct)

module.exports = router