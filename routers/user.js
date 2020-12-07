const { User } = require('../models')
const route = require('express').Router()
const UserController = require('../controllers/user')

route.post('/login',UserController.login)

module.exports = route