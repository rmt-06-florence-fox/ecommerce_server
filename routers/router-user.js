const user = require ('express').Router()
const { ControllerUser } = require ('../controllers')
const authentication = require ('../middlewares/authentication')
const adminAuth = require ('../middlewares/admin-authorization')


user.get('/', ControllerUser.welcome)
user.post('/login', ControllerUser.login)
user.post('/register', ControllerUser.register)
user.get('/user', authentication, adminAuth, ControllerUser.getUser)
user.get('/user/all', authentication, adminAuth, ControllerUser.getAll)



module.exports = user