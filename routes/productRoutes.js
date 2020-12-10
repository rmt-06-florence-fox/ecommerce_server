const routes = require('express').Router()
const  {ProductController}  = require('../controller')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization')



routes.use(authentication)
routes.get('/', ProductController.getAllProduct)

routes.use(authorization)

routes.post('/', ProductController.addNewProduct)
routes.delete('/:id', ProductController.destroyProduct)
routes.put('/:id',ProductController.replaceProduct)






module.exports = routes