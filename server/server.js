const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
// config env
dotenv.config();



const app = express();

// config cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);

// config json
app.use(express.json());

// url enconded
app.use(express.urlencoded({ extended: true }));

// config route
const route = require("./src/routes");
route(app);

// connect database
const connectDB = require("./src/config/connectDB");
connectDB();

// config port
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
