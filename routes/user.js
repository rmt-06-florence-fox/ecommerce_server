const express = require('express')
const router = express.Router()
const {UserController} = require('../controllers')

//punya admin
router.post('/login', UserController.login)
router.post('/register', UserController.register)
//punya customer
router.post('/logincustomer', UserController.loginCustomer)


module.exports = router