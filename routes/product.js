const route = require('express').Router()
const {ProductController} = require('../controllers')
const authAdmin = require('../middlewares/authAdmin')

route.post('/', authAdmin, ProductController.addProduct)
route.put('/:id', authAdmin, ProductController.updateProduct)
route.delete('/:id', authAdmin, ProductController.deleteProduct)


module.exports = route