const { ProductController } = require('../controllers')
const routes = require('express').Router()
const checkId = require('../middlewares/check-productid')
const roleAuthorization = require('../middlewares/role-authorization')

routes.use(roleAuthorization) // ! roleauthorization
routes.use('/products/:id', checkId)
routes.post('/products', ProductController.postProduct)
routes.put('/products/:id', ProductController.putProduct)
routes.delete('/products/:id', ProductController.deleteProduct)

module.exports = routes