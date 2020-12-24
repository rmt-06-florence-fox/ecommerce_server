const express = require('express');
const router = express.Router();
const {Controller} = require('../controllers/controller')
const routerProduct = require('./productRoutes')
const routerCart = require('./cartRoutes')

router.post('/register',Controller.register)
router.post('/login',Controller.login)
router.use('/products',routerProduct)
router.use('/carts',routerCart)

module.exports = router