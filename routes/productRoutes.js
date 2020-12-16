const routes = require('express').Router()
const  {ProductController}  = require('../controller')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization')



routes.get('/', ProductController.getAllProduct)
routes.use(authentication)

routes.use(authorization)

routes.post('/', ProductController.addNewProduct)
routes.delete('/:id', ProductController.destroyProduct)
routes.put('/:id',ProductController.replaceProduct)






module.exports = routes