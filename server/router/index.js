
const express = require('express')
const UserController = require('../controller/UserController')
const productrouter = require('./productrouter')
const router = express.Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)


router.use(productrouter)


module.exports = router