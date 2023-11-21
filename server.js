const express = require("express");

const mainRoute = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.listen("1234", () => {
  console.log("Listening on the port blah blah blah...");
});

app.use("/auth", authRoutes);
app.use("/", mainRoute);
