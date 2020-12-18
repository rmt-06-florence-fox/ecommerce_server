const router = require('express').Router()
const Controller = require('../controllers')
const routerProduct = require('./product')
const routerUser = require('./user')
const routerCart = require('./cart')

router.get('/', Controller.home)
router.use(routerUser)
router.use(routerProduct)
router.use('/cart', routerCart)

module.exports = router