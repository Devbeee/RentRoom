import { where } from "sequelize";

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

export const getPostsLimitService = async (
  page,
  query,
  { priceNumber, areaNumber }
) => {
  try {
    let offset = !page || +page <= 1 ? 0 : +page - 1;
    const queries = { ...query };
    if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber };
    if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };
    const response = await db.Post.findAndCountAll({
      where: queries,
      raw: true,
      nest: true,
      offset: offset * +process.env.LIMIT,
      limit: +process.env.LIMIT,
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "published", "hashtag"],
        },
        { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
      ],
      attributes: ["id", "title", "star", "address", "description"],
    });
    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "Getting posts is failed.",
      response,
    };
  } catch (error) {
    return error;
  }
};
