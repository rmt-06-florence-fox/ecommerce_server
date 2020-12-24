const express = require('express');
const router = express.Router();
const {ProductController} = require('../controllers/controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', ProductController.fetchProducts)
router.use(authentication,authorization)
router.post('/',ProductController.createProduct)
router.get('/:id', ProductController.fetchProductsById)
router.put('/:id',ProductController.updateProduct)
router.delete('/:id',ProductController.destroyProduct)


module.exports = router