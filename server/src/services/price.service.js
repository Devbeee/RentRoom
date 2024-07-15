const db = require("../models");

// GET ALL PRICE
export const getPricesService = async () => {
  try {
    const response = await db.Price.findAll({
      raw: true,
      attributes: ['code', 'value', 'order']
    });
    if (response) {
      return {
        err: 0,
        msg: "Get price ok",
        response,
      };
    } else {
      return {
        err: 1,
        msg: "Get price fail",
        response: null,
      };
    }
  } catch (error) {
    return {
      err: -1,
      msg: "Get price fail",
      error
    };
  }
};
