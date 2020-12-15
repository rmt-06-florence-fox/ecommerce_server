const express = require('express')
const router = express.Router()
const {UserController} = require('../controllers')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/logincustomer', UserController.loginCustomer)


module.exports = router