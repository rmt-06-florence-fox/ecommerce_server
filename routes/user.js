const route = require('express').Router()
const { UserController } = require('../controllers')

route.post('/login', UserController.login)

module.exports = route