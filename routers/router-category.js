const category = require ('express').Router()
const {ControllerCategory} = require ('../controllers')

category.get('/', ControllerCategory.findAll)
category.post('/bulk', ControllerCategory.bulkPost)
category.delete('/bulk/:id', ControllerCategory.bulkDelete)
// category.post('/', ControllerCategory.post)

module.exports = category