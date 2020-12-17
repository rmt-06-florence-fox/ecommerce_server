const router = require("express").Router();
const CartController = require("../controllers/cart-controller");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, CartController.getUserCart);
router.put("/increase", authentication, CartController.increaseItem);
router.put("/decrease", authentication, CartController.decreaseItem);
router.post("/", authentication, CartController.createItem);
router.delete("/:id", authentication, CartController.deleteItem);
router.delete("/checkout", authentication, CartController.checkout);

module.exports = router;
