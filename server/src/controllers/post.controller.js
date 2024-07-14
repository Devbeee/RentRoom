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
export const getPostsLimit = async (req, res, next) => {
  const { page } = req.query;
  try {
    const response = await postService.getPostsLimitService(page);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at post controller" + error,
    });
  }
};
