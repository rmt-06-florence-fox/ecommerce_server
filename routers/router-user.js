const user = require ('express').Router()
const { ControllerUser } = require ('../controllers')


user.get('/', ControllerUser.welcome)
user.post('/login', ControllerUser.login)
user.post('/register', ControllerUser.register)


module.exports = user