const products = require('express').Router()
const productController = require('../controllers/productController')
const { authorize } = require('../middlewares/authorization')

//test
products.get('/', (req, res) => {
  res.send('ok')
})

//crud
products.get('/', authorize, productController.get)
products.post('/', productController.create)
products.put('/:id', productController.update)
products.delete('/:id', productController.delete)

module.exports = products