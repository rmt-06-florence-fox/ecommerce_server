const routerUser = require('express').Router()
const Controller = require('../controllers/index')

routerUser.post('/register', Controller.register)
routerUser.post('/login', Controller.login)
// routerUser.post('/googlelogin', Controller.google)

module.exports = routerUser