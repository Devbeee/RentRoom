const authService = require("../services/auth.service");

export const register = async (req, res, next) => {
  const { name, phone, password } = req.body;
  try {
    if (!name || !phone || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    }
    const response = await authService.registerService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller" + error,
    });
  }
};

export const login = async (req, res, next) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    }
    const response = await authService.loginService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller" + error,
    });
  }
};
export const sendOTP = async (req, res, next) => {
  const { phone } = req.body;
  try {
    const response = await authService.sendOTPService(phone);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller" + error,
    });
  }
};
export const verifyOTP = async (req, res, next) => {
  const { phoneNumber, otp } = req.body;
  try {
    const response = await authService.verifyOTPService(phoneNumber, otp);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller" + error,
    });
  }
};
