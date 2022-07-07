const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const dbClient = require("./db/dbClient");

const tourRouter = require("./routers/tour");
const adminRouter = require("./routers/admin");
const userRouter = require("./routers/user");
const hotelRouter = require("./routers/hotel");

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.options("*", cors({ origin: "*", credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));

const run = async () => {
  try {
    await dbClient.connect();
    app.use("/tour", tourRouter);
    app.use("/admin", adminRouter);
    app.use("/user", userRouter);
    app.use("/hotels", hotelRouter);
    app.use((req, res) => {
      res.send({ success: false, message: "no page found" });
    });
  } finally {
  }
};

run().catch();

module.exports = app;
