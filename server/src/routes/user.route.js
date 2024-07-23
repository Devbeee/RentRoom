const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const userController = require("../controllers/user.controller");
router.use(verifyToken);
router.get("/get-current", userController.getCurrentUser);
router.put("/update", userController.updateProfile);

module.exports = router;
