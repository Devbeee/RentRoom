const db = require("../models");

// GET ALL CATEGORY
export const getCategoriesService = async () => {
  try {
    const response = await db.Category.findAll({
      raw: true,
    });
    if (response) {
      return {
        err: 0,
        msg: "Get category ok",
        response,
      };
    } else {
      return {
        err: 1,
        msg: "Get category fail",
        response: null,
      };
    }
  } catch (error) {
    return error
  }
};
