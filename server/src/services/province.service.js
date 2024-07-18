const db = require("../models");

// GET ALL PRICE
export const getProvincesService = async () => {
  try {
    const response = await db.Province.findAll({
      raw: true,
      attributes: ['code', 'value']
    });
    if (response) {
      return {
        err: 0,
        msg: "Get provinces ok",
        response,
      };
    } else {
      return {
        err: 1,
        msg: "Get provinces fail",
        response: null,
      };
    }
  } catch (error) {
    return {
      err: -1,
      msg: "Get provinces fail",
      error
    };
  }
};
