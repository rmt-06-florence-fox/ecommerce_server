const router = require('express').Router()
const WishController = require('../controllers/wishController')

router.post('/:id', WishController.addWish)
router.get('/', WishController.fetchWish)
router.delete('/:id', WishController.destroyWish)

module.exports = router