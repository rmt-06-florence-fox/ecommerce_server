const router = require('express').Router()
const WishListController = require('../controllers/WishListController')
const authentication = require('../middlewares/authentication')
const authorization = require("../middlewares/wishAuthorization")

router.use(authentication)
router.get("/", WishListController.list)
router.post("/:productId", WishListController.add)
router.delete("/:id",authorization, WishListController.delete)

module.exports = router