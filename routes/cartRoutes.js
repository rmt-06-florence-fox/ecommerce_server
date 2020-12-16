const cart = require('express').Router()
const cartController = require('../controllers/cartController')

cart.get('/', (req, res, next) => {
  res.send('dari route cart')
})

module.exports = cart