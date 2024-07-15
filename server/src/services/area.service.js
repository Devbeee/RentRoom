const db = require("../models");

// GET ALL PRICE
export const getAreasService = async () => {
  try {
    const response = await db.Area.findAll({
      raw: true,
      attributes: ['code', 'value', 'order']
    });
    if (response) {
      return {
        err: 0,
        msg: "Get area ok",
        response,
      };
    } else {
      return {
        err: 1,
        msg: "Get area fail",
        response: null,
      };
    }
  } catch (error) {
    return {
      err: -1,
      msg: "Get area fail",
      error
    };
  }
};
