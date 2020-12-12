const routerProduct = require('express').Router()
const Controller = require('../controllers/index')
const authentication = require('../middlewear/authentication')
const authorize = require('../middlewear/authorize')

routerProduct.use(authentication)
routerProduct.post('/products', authorize, Controller.createProduct)
routerProduct.get('/products', authorize, Controller.getAll)
routerProduct.get('/products/:id', authorize, Controller.getById)
routerProduct.delete('/products/:id', authorize, Controller.deleteProduct)
routerProduct.put('/products/:id', authorize, Controller.editProduct)

module.exports = routerProduct