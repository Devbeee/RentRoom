const authRouter = require("./auth.route");
const insertRouter = require("./insert.route");
const categoryRouter = require("./category.route");

function route(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);

  app.use("/", (req, res) => {
    console.log("connect server");
  });
}

module.exports = route;
