const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let accessToken = req.headers.authorization.split(' ')[1];
  if (accessToken) {
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({
          err: 1,
          msg: "Access token expired",
        });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      err: 1,
      msg: "Missing access token",
    });
  }
};

module.exports = verifyToken;