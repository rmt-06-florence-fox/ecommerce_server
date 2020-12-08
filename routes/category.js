const { CategoryController } = require('../controllers')
const routes = require('express').Router()

routes.get('/categories', CategoryController.getCategory)

module.exports = routes