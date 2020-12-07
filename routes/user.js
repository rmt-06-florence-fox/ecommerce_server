const routes = require('express').Router()
const { userController } = require('../controllers')

routes.post('/login/admin', userController.loginAdmin)

module.exports = routes