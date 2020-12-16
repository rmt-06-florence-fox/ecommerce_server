const express = require('express')
const router = express.Router()
const { CartController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorizationCart = require('../middlewares/authorizationcart') 

router.use(authentication)
router.post('/', CartController.addOrEditCart)
router.get('/', CartController.fetch)
router.get('/histories', CartController.fetchHistory)
router.delete('/', authorizationCart, CartController.delete)
router.put('/', CartController.checkout)

module.exports = router