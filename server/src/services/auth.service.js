const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const { LRUCache } = require("lru-cache");
const options = {
  max: 500,
  maxSize: 5000,
  ttl: 1000 * 60 * 5,
  sizeCalculation: (value, key) => {
    return 1;
  },
};
const cache = new LRUCache(options);

const randomstring = require("randomstring");
const dotenv = require("dotenv");
dotenv.config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
// utils
const generateOTP = () => {
  return randomstring.generate({
    length: 4,
    charset: "numeric",
  });
};
const sendVoiceCall = (phoneNumber, message) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InN0cmluZ2VlLWFwaTt2PTEifQ.eyJqdGkiOiIxIiwiaXNzIjoiU0suMC5UV1dtMEsxYVp5ZDBPWlBxTkZlRkxza1RjTTZ5bVl2dCIsInJlc3RfYXBpIjp0cnVlfQ.Mh09DoadNUF2bWYkbcWRghC-F5UJkapdo5H6M9ndvlo"
  );
  myHeaders.append("Cookie", "SRVNAME=SD");

  const raw = JSON.stringify({
    from: {
      type: "external",
      number: "842471027521",
      alias: "STRINGEE_NUMBER",
    },
    to: [
      {
        type: "external",
        number: `${phoneNumber.replace("0", "84")}`,
        alias: "TO_NUMBER",
      },
    ],
    actions: [
      {
        action: "talk",
        text: message,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.stringee.com/v1/call2/callout", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};
export const sendOTPService = async (phoneNumber) => {
  const otp = generateOTP();
  console.log(otp);
  if (phoneNumber) {
    cache.set(`otp:${phoneNumber}`, otp);
    sendVoiceCall(phoneNumber, `Your OTP is ${otp}`);
  } else {
    return {
      err: 1,
      msg: "Missing phoneNumber",
    };
  }
};

export const verifyOTPService = async (phoneNumber, otp) => {
  const storedOTP = await cache.get(`otp:${phoneNumber}`);
  if (!storedOTP) {
    return {
      err: 1,
      msg: "OTP expired or invalid",
    };
  }
  if (+storedOTP !== +otp) {
    return {
      err: 2,
      msg: "Invalid OTP",
    };
  }
  const user = await db.User.findOne({
    where: { phone: phoneNumber },
    raw: true,
  });
  if (user) {
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
    const response = await db.User.update(
      { isAuthencated: 1 },
      {
        where: { id: user.id },
      }
    );
    cache.clear();
    return {
      err: 0,
      msg: "OTP has been verified successfully",
      token,
    };
  } else {
    return {
      err: 2,
      msg: "Số điện thoại đã được sử dụng",
      token: null,
    };
  }
};
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
      return {
        err: 0,
        msg: "Đăng ký thành công",
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
      const isAuthencated = user.isAuthencated;
      if (!!isAuthencated) {
        return {
          err: 2,
          msg: "Bạn chưa xác thực số điện thoạis",
          token: null,
        };
      }
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
