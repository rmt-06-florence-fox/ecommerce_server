const route = require('express').Router()
const productRoute = require('./productRoute')
const UserController = require('../controllers/UserController')

route.use('/products', productRoute)
route.post('/login', UserController.login)

module.exports = route