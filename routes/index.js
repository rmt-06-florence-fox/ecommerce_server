const routes = require('express').Router()
const userRoutes = require('./user')

routes.use(userRoutes)

module.exports = routes