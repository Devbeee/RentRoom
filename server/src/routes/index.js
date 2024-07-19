const authRouter = require("./auth.route");
const insertRouter = require("./insert.route");
const categoryRouter = require("./category.route");
const postRouter = require("./post.route");
const priceRouter = require("./price.route");
const areaRouter = require("./area.route");
const provinceRouter = require("./province.route");
const userRouter = require("./user.route");

function route(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/price", priceRouter);
  app.use("/api/v1/area", areaRouter);
  app.use("/api/v1/province", provinceRouter);
  app.use("/api/v1/user", userRouter);

  app.use("/", (req, res) => {
    console.log("connect server");
  });
}

module.exports = route;
