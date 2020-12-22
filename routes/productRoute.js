const route = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.get('/', ProductController.listProducts)
route.get('/:id', ProductController.filterId)
route.use(authentication)
route.post('/', authorization, ProductController.addProduct)
route.put('/:id', authorization, ProductController.editProduct)
route.delete('/:id', authorization, ProductController.deleteId)

module.exports = route