const postService = require("../services/post.service");

export const getPosts = async (req, res, next) => {
  try {
    const response = await postService.getPostsService();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post controller" + error,
    });
  }
};
export const getPostsLimit = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;

  try {
    const response = await postService.getPostsLimitService(page, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};

export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const createPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, areaNumber, label } = req.body;
    const { id } = req.user;
    if (
      !categoryCode ||
      !id ||
      !title ||
      !priceNumber ||
      !areaNumber ||
      !label
    ) {
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    }

    const response = await postService.createNewPostService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getPostsLimitAdmin = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing user id",
      });
    const response = await postService.getPostsLimitAdminService(
      page,
      id,
      query
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { postId, categoryCode, title, priceNumber, areaNumber, label } =
      req.body;
    if (
      !categoryCode ||
      !postId ||
      !title ||
      !priceNumber ||
      !areaNumber ||
      !label
    ) {
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    }

    const response = await postService.updatePostService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { postId, imagesId, attributesId, overviewId } = req.query;
    if (!imagesId || !postId || !attributesId || !overviewId) {
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    }

    const response = await postService.deletePostService(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
