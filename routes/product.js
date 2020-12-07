const { ProductController } = require('../controllers')
const routes = require('express').Router()
const roleAuthorization = require('../middlewares/role-authorization')
const checkId = require('../middlewares/check-productid')

routes.get('/products', ProductController.getProduct)

routes.use(roleAuthorization) // ! roleauthorization
routes.post('/products', ProductController.postProduct)
routes.use('/products/:id', checkId)
routes.put('/products/:id', ProductController.putProduct)
routes.delete('/products/:id', ProductController.deleteProduct)

module.exports = routes