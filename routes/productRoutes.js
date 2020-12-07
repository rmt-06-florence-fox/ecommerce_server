const products = require('express').Router()
const productController = require('../controllers/productController')
const { authorize } = require('../middlewares/authorization')

//test
products.get('/', (req, res) => {
  res.send('ok')
})

//crud
products.post('/', authorize, productController.create)
products.get('/', authorize, productController.get)
products.put('/:id', productController.update)
products.delete('/:id', productController.delete)

module.exports = products