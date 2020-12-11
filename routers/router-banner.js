const banner = require ('express').Router()
const { ControllerBanner } = require ('../controllers')
const adminAuth = require ('../middlewares/admin-authorization')

banner.get('/', ControllerBanner.get)
banner.use(adminAuth)
banner.post('/', ControllerBanner.post)
banner.get('/:id', ControllerBanner.getById)
banner.put('/:id', ControllerBanner.update)
banner.delete('/:id', ControllerBanner.delete)
banner.patch('/:id', ControllerBanner.patch)

module.exports = banner