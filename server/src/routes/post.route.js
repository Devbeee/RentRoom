const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/all",postController.getPosts);
router.get("/limit",postController.getPostsLimit);
router.get("/new-posts",postController.getNewPosts);

router.use(verifyToken)
router.post('/create', postController.createPost)
module.exports = router;
