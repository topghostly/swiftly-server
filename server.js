const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const mainRoute = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoute");

const app = express();

databaseURL = `mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONGOOSE_PASSWORD}@swifty-database.rwbrfiw.mongodb.net/`;

mongoose
  .connect(databaseURL)
  .then((result) => {
        app.listen("1234", () => {
      console.log("Listening on the port blah blah blah...");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1/auth", authRoutes);
app.use("/v1/client", clientRoutes);
app.use("/", mainRoute);
