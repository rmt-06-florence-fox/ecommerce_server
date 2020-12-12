const CategoryController = require('../controllers/categoryController')
const route = require('express').Router()
const authenctication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

route.use(authenctication, authorization)
route.get('/', CategoryController.getCategory )
route.post('/', CategoryController.createCategory)
module.exports = route