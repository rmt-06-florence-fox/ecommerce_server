const products = require('express').Router()
const productController = require('../controllers/productController')
const { authorize } = require('../middlewares/authorization')
const authentication = require("../middlewares/authentication")

//test
products.get('/', (req, res) => {
  res.send('ok')
})

//crud
products.get('/', productController.get)

products.use(authentication)
products.post('/', productController.create)
products.put('/:id', productController.update)
products.delete('/:id', productController.delete)

module.exports = products