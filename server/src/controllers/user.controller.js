const userService = require("../services/user.service");
export const getCurrentUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const response = await userService.getCurrentUserService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at user controller" + error,
    });
  }
};
export const updateProfile = async (req, res, next) => {
  const { id } = req.user;
  const payload = req.body;

  try {
    if (Object.keys(payload)?.length === 0) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    }
    const response = await userService.updateProfileService(payload, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at user controller" + error,
    });
  }
};
