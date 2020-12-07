const route = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentification = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentification)
route.get('/', authorization, ProductController.listProducts)
route.post('/', authorization, ProductController.addProduct)
route.put('/:id', authorization, ProductController.editProduct)
route.get('/:id', authorization, ProductController.filterId)
route.delete('/:id', authorization, ProductController.deleteId)

module.exports = route