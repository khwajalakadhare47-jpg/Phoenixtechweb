const router = require("express").Router();
const { requireAuth } = require("../middleware/auth");
const controller = require("../controllers/admissionController");

router.get("/", requireAuth, controller.list);
router.post("/", controller.create);
router.patch("/:id/status", requireAuth, controller.updateStatus);
router.delete("/:id", requireAuth, controller.remove);

module.exports = router;
