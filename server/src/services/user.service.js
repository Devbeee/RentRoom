import { where } from "sequelize";

const db = require("../models");

export const getCurrentUserService = async (id) => {
  try {
    const response = await db.User.findOne({
      where: { id },
      raw: true,
      attributes: { exclude: ["password"] },
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
      error,
    };
  }
};
