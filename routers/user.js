const route = require('express').Router()
const UserController = require('../controllers/user')

route.post('/register',UserController.register)
route.post('/login',UserController.login)
route.post('/login2',UserController.login2)

module.exports = route