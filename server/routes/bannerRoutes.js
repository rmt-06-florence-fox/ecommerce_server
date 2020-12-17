const route = require("express").Router();
const BannerController = require("../controllers/BannerController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

route.use(authentication);
route.get("/", BannerController.read);

route.use(authorization);
route.post("/", BannerController.add);
route.get("/:id", BannerController.findByPk);
route.put("/:id", BannerController.put);
route.delete("/:id", BannerController.delete);

module.exports = route;