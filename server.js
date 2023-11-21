const express = require("express");
const bodyParser = require("body-parser");

const mainRoute = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/", mainRoute);

app.listen("1234", () => {
  console.log("Listening on the port blah blah blah...");
});
