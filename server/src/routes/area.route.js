const express = require("express");
const router = express.Router();
const areaController = require("../controllers/area.controller");
router.get("/all", areaController.getAreas);

module.exports = router;
