import { raw } from "express";

const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = async ({ name, phone, password }) => {
  try {
    const [user, created] = await db.User.findOrCreate({
      where: { phone },
      defaults: {
        id: uuid.v4(),
        name,
        phone,
        password: hashPassword(password),
      },
    });

    if (created) {
      const token = jwt.sign(
        {
          id: user.id,
          phone: user.phone,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2d",
        }
      );

      return {
        err: 0,
        msg: "Đăng ký thành công",
        token,
      };
    } else {
      return {
        err: 2,
        msg: "Số điện thoại đã được sử dụng",
        token: null,
      };
    }
  } catch (error) {
    return error;
  }
};
export const loginService = async ({ phone, password }) => {
  try {
    const user = await db.User.findOne({
      where: { phone },
      raw: true,
    });

    if (user) {
      const isCorrectPassword = bcrypt.compareSync(password, user.password);
      if (isCorrectPassword) {
        return {
          err: 2,
          msg: "Mật khẩu không đúng",
          token: null,
        };
      }
      const token = jwt.sign(
        {
          id: user.id,
          phone: user.phone,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2d",
        }
      );

      return {
        err: 0,
        msg: "Đăng nhập thành công",
        token,
      };
    } else {
      return {
        err: 2,
        msg: "Số điện thoại không tìm thấy",
        token: null,
      };
    }
  } catch (error) {
    return error;
  }
};
