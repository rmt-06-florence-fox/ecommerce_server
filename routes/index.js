const express = require('express')
const route = express.Router()
const UserController = require('../controller')

route.post('/adminLogin', UserController.adminLogin)

module.exports = route