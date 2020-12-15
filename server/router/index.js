
const express = require('express')
const UserController = require('../controller/UserController')
const productrouter = require('./productrouter')
const cartRouter = require('./cartRouter')
const router = express.Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/loginCust', UserController.loginCust)
router.post('/registerCust', UserController.registerCust)


router.use(productrouter)
router.use(cartRouter)

module.exports = router