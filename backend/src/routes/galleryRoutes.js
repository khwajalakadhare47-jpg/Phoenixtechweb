const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const controller = require("../controllers/galleryController");

router.get("/", controller.list);
router.get("/:id", controller.getOne);
router.post("/", requireAuth, controller.create);
router.put("/:id", requireAuth, controller.update);
router.delete("/:id", requireAuth, controller.remove);

module.exports = router;
