const category = require ('express').Router()
const {ControllerCategory} = require ('../controllers')

category.get('/', ControllerCategory.findAll)
category.post('/', ControllerCategory.post)
category.put('/:id', ControllerCategory.put)
category.delete('/:id', ControllerCategory.delete) 
category.post('/bulk', ControllerCategory.bulkPost)
category.delete('/bulk/:id', ControllerCategory.bulkDelete)

module.exports = category