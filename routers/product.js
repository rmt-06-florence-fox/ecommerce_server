const routerProduct = require('express').Router()
const Controller = require('../controllers/index')
const authentication = require('../middlewear/authentication')
const authorize = require('../middlewear/authorize')

routerProduct.get('/products', Controller.getAll)
routerProduct.use(authentication)
routerProduct.get('/products', Controller.getAll)
routerProduct.post('/products', authorize, Controller.createProduct)
routerProduct.get('/products/:id', authorize, Controller.getById)
routerProduct.delete('/products/:id', authorize, Controller.deleteProduct)
routerProduct.put('/products/:id', authorize, Controller.editProduct)

module.exports = routerProduct