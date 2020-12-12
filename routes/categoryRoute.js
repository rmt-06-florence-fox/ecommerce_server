const route = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)
route.get('/', authorization, CategoryController.listCategories)
route.post('/', authorization, CategoryController.addCategory)

module.exports = route