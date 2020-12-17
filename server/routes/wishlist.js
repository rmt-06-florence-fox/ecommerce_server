const router = require("express").Router();
const WishListController = require("../controllers/wishlist-controller");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, WishListController.getUserWish);
router.post("/", authentication, WishListController.createWish);
router.delete("/:id", authentication, WishListController.deleteWish);

module.exports = router;
