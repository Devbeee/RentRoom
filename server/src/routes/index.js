const authRouter = require("./auth.route");
const insertRouter = require("./insert.route");
const categoryRouter = require("./category.route");
const postRouter = require("./post.route");

function route(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);

  app.use("/", (req, res) => {
    console.log("connect server");
  });
}

module.exports = route;
