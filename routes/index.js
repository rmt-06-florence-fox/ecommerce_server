const express = require('express');
const router = express.Router();
const {Controller} = require('../controllers/controller')
const routerProduct = require('./productRoutes')

router.post('/register',Controller.register)
router.post('/login',Controller.login)
router.use('/products',routerProduct)

module.exports = router