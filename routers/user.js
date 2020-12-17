const routerUser = require('express').Router()
const Controller = require('../controllers/index')

routerUser.post('/register', Controller.register)
routerUser.post('/login', Controller.loginCustomer)
routerUser.post('/loginadm', Controller.login)

module.exports = routerUser