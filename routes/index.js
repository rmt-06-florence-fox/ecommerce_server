const UserController = require('../controllers/userController')

const route = require('express').Router()


route.post('/register', UserController.register)
route.post('/login', UserController.login)
module.exports = route