const router = require("express").Router();
const { ProductController } = require("../controllers");
const {
  authentication,
  authorization,
} = require("../middlewares/authentication-authorization");

router.get("/", ProductController.show);
router.use(authentication);
router.use(authorization);
router.post("/", ProductController.add);
router.get("/:id", ProductController.find);
router.put("/:id", ProductController.edit);
router.delete("/:id", ProductController.remove);

module.exports = router;
