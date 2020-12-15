const route = require('express').Router()
const {ProductController} = require('../controllers')
const authAdmin = require('../middlewares/authAdmin')
const authentication = require('../middlewares/authentication')

route.get('/', ProductController.findAllProduct)
route.use(authentication)
route.get('/:id', authAdmin, ProductController.findByIdProduct)
route.post('/', authAdmin, ProductController.addProduct)
route.put('/:id', authAdmin, ProductController.updateProduct)
route.delete('/:id', authAdmin, ProductController.deleteProduct)


module.exports = route