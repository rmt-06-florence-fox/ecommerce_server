const express = require('express');
const router = express.Router();
const { CartController } = require('../controllers/controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
router.use(authentication)
router.post('/',CartController.createCart)
router.get('/', CartController.fetchCarts)
router.patch('/:id',CartController.updateCart)
router.delete('/:id',CartController.destroyCart)




module.exports = router