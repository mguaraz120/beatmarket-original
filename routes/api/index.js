const router = require("express").Router();
const beatRoutes = require("./beats");

// Book routes
router.use("/beats", beatRoutes);

module.exports = router;
