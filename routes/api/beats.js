const router = require("express").Router();
const beatsController = require("../../controllers/beatsController");

router.route("/upload").post(beatsController.createAudioFile);

// Matches with "/api/beats"
router
  .route("/")
  .get(beatsController.findAll)
  .post(beatsController.create);

// Matches with "/api/beats/:id"
router
  .route("/:id")
  .get(beatsController.findById)
  .put(beatsController.update)
  .delete(beatsController.remove);

module.exports = router;
console.log("");
