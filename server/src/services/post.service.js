const { Op } = require("sequelize");
const db = require("../models");
const { v4 } = require("uuid");
const moment = require("moment");
const generateCode = require("../utils/generateCode");
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
      order: [['createdAt','DESC']],
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

export const getNewPostsService = async () => {
  try {
    const response = await db.Post.findAll({
      raw: true,
      nest: true,
      offset: 0,
      order: ['createdAt','DESC'],
      limit: +process.env.LIMIT,
      include: [
        { model: db.Image, as: "images", attributes: ["image"] },
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "published", "hashtag"],
        },
      ],
      attributes: ["id", "title", "star", "createdAt"],
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

export const createNewPostService = async (payload, userId) => {
  try {
    let attributesId = v4();
    let imagesId = v4();
    let overviewId = v4();
    let labelCode = generateCode(payload.label).trim();
    const currentDate = new Date();
    const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
    const response = await db.Post.create({
      id: v4(),
      title: payload.title || "",
      labelCode,
      address: payload.address || "",
      attributesId,
      imagesId,
      userId,
      overviewId,
      categoryCode: payload.categoryCode,
      description: JSON.stringify(payload.description) || "",
      areaCode: payload.areaCode || "",
      priceCode: payload.priceCode || "",
      provinceCode: payload?.province?.includes("Thành phố")
        ? generateCode(payload?.province.replace("Thành phố", ""))
        : generateCode(payload?.province.replace("Tỉnh", "")),
      priceNumber: payload.priceNumber,
      areaNumber: payload.areaNumber,
    });
    await db.Attribute.create({
      id: attributesId,
      price:
        +payload.priceNumber < 1
          ? `${+payload.priceNumber * 1000000} đồng/tháng`
          : `${+payload.priceNumber} triệu/tháng`,
      acreage: `${payload.areaNumber}m2`,
      published: moment(new Date()).format("DD/MM/YYYY"),
      hashtag,
    });
    await db.Image.create({
      id: imagesId,
      image: JSON.stringify(payload?.images || []),
    });
    await db.Overview.create({
      id: overviewId,
      code: hashtag,
      area: payload.label,
      type: payload?.category || "",
      target: payload.target,
      bonus: "Tin thường",
      created: new Date(),
      expired: currentDate.setDate(currentDate.getDate() + 7),
    });
    await db.Province.findOrCreate({
      where: {
        [Op.or]: [
          { value: payload?.province.replace("Thành phố", "") },
          { value: payload?.province.replace("Tỉnh", "") },
        ],
      },
      defaults: {
        code: payload?.province?.includes("Thành phố")
          ? generateCode(payload?.province.replace("Thành phố", ""))
          : generateCode(payload?.province.replace("Tỉnh", "")),
        value: payload?.province?.includes("Thành phố")
          ? payload?.province.replace("Thành phố", "")
          : payload?.province.replace("Tỉnh", ""),
      },
    });
    await db.Label.findOrCreate({
      where: {
        code: labelCode,
      },
      defaults: {
        code: labelCode,
        value: payload.label,
      },
    });
    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "Create new post failed",
    };
  } catch (error) {
    return error;
  }
};
