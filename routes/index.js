const express = require('express')
const router = express.Router()
const user = require('./user')
const product = require('./product')

router.use('/', user)
router.use('/products', product)

module.exports = router