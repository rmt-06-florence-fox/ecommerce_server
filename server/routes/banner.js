const { request } = require("express");

const router = require("express").Router()
const BannerController = require("../controllers/bannerController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.get("/", BannerController.list)
router.use(authentication)
router.get("/:id", BannerController.listOne)
router.post("/", authorization, BannerController.add)
router.put("/:id", authorization, BannerController.edit)
router.delete("/:id",authorization, BannerController.delete)

module.exports = router