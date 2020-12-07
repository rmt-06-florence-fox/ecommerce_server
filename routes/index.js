const routes = require('express').Router()
const userRoute = require('./user')

routes.use('/', userRoute)


module.exports = routes