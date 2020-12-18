const route = require('express').Router()
const {ProductController} = require('../controllers')
const authAdmin = require('../middlewares/authAdmin')

route.get('/', ProductController.findAllProduct)
route.use(authAdmin)
route.get('/:id', ProductController.findByIdProduct)
route.post('/', ProductController.addProduct)
route.put('/:id', ProductController.updateProduct)
route.delete('/:id', ProductController.deleteProduct)


module.exports = route