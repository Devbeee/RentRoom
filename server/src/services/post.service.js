const db = require("../models");

export const getPostsService = async () => {
  try {
    const response = await db.Post.findAll({
      raw: true,
      nest: true,
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "published", "hashtag"],
        },
        {
          model: db.User,
          as: "user",
          attributes: ["name", "zalo", "phone", "avatar"],
        },
      ],
      attributes: ["id", "title", "star", "address", "description"],
    });
    if (response) {
      return {
        err: 0,
        msg: "Get post OK",
        response,
      };
    } else {
      return {
        err: 1,
        msg: "Get post fail",
        response: null,
      };
    }
  } catch (error) {
    return error;
  }
};

export const getPostsLimitService = async (offset) => {
  try {
    const response = await db.Post.findAndCountAll({
      raw: true,
      nest: true,
      offset: +offset *+process.env.LIMIT || 0,
      limit: +process.env.LIMIT,
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "published", "hashtag"],
        },
        {
          model: db.User,
          as: "user",
          attributes: ["name", "zalo", "phone", "avatar"],
        },
      ],
      attributes: ["id", "title", "star", "address", "description"],
    });
    if (response) {
      return {
        err: 0,
        msg: "Get post OK",
        response,
      };
    } else {
      return {
        err: 1,
        msg: "Get post fail",
        response: null,
      };
    }
  } catch (error) {
    return error;
  }
};
