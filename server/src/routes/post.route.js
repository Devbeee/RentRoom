const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
router.get("/all",postController.getPosts);
router.get("/limit",postController.getPostsLimit);

module.exports = router;
