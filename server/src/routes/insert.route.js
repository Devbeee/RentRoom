const express = require("express");
const inserController = require('../controllers/insert.controller')
const router = express.Router();

router.post("/",inserController.insert)

module.exports = router;
