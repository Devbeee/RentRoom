const authRouter = require("./auth.route");
function route(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/", (req,res) => {
    console.log("connect server");
  });
}

module.exports = route;
