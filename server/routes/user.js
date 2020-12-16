const router = require("express").Router();
const UserController = require("../controllers/user-controllers");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, UserController.getUser);
router.post("/login", UserController.login);
router.post("/register", UserController.register);

module.exports = router;
