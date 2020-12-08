const routes = require('express').Router()
const {UserController} = require('../controller')


routes.post('/login', UserController.login)


module.exports = routes