const admin = require('express').Router()
const userController = require('../controllers/userController')

// dashboard page cms
admin.get('/', (req, res) => {
  res.send('ok')
})

// routes login
admin.post('/login', userController.login)

module.exports = admin