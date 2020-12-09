const router = require("express").Router();
const ProductController = require("../controllers/product-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", authentication, ProductController.fetchProduct);
router.post("/", authentication, ProductController.createProduct);
router.put(
  "/:id",
  authentication,
  authorization,
  ProductController.editProduct
);
router.delete(
  "/:id",
  authentication,
  authorization,
  ProductController.deleteProduct
);

module.exports = router;
