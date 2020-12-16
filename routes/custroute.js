const customer = require('express').Router()
const UserController = require('../controllers/usercontroller')

customer.post('/signup', UserController.custSignUp)
customer.post('/signin', UserController.custSignIn)

module.exports = customer