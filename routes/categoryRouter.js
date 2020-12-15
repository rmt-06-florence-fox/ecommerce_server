const CategoryController = require('../controllers/categoryController')
const route = require('express').Router()
const authenctication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

route.get('/', CategoryController.getCategory )
route.use(authenctication, authorization)
route.post('/', CategoryController.createCategory)
module.exports = route