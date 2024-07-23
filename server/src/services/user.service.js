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
        msg: "Get current user ok",
        response,
      };
    } else {
      return {
        err: 1,
        msg: "Get current user fail",
        response: null,
      };
    }
  } catch (error) {
    return {
      err: -1,
      msg: "Get current user fail",
      error,
    };
  }
};
export const updateProfileService = async (payload, id) => {
  try {
    const response = await db.User.update(payload, {
      where: { id },
    });
    if (response[0] > 0) {
      return {
        err: 0,
        msg: "Update profile ok",
        response,
      };
    } else {
      return {
        err: 1,
        msg: "Update profile fail",
        response: null,
      };
    }
  } catch (error) {
    return {
      err: -1,
      msg: "Update profile fail",
      error,
    };
  }
};
