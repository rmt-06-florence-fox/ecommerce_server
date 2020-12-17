const route = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.get('/', CategoryController.listCategories)
route.use(authentication)
route.post('/', authorization, CategoryController.addCategory)

module.exports = route