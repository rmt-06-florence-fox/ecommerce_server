
const express = require('express')
const ProductController = require('../controller/ProductController')
const authentication = require('../middlewares/authentication')
const authorisation = require('../middlewares/autorisesion')
const router = express.Router()

router.get('/products', ProductController.showAll)
router.use(authentication)
router.use(authorisation)
router.post('/products', ProductController.add)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)




module.exports = router