const router = require("express").Router();
const { CartController } = require("../controllers");
const {
  authentication, authorizationCustomer
} = require("../middlewares/authentication-authorization");

router.use(authentication);
router.get("/", CartController.getCart);
router.post("/", CartController.postCart);
router.patch("/:id", CartController.updateQuantity)
router.delete("/", CartController.dummyCheckout)
router.delete("/:id", authorizationCustomer, CartController.remove)

module.exports = router;
