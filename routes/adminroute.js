const admin = require('express').Router()
const UserController = require('../controllers/usercontroller')

admin.get('/', (req, res) => res.send('hallo'))
admin.post('/signin', UserController.adminSignIn)

module.exports = admin