const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;
const mongoose = require("./db.js");
app.use(cors());
app.use(express.json());
app.use(require("./routes/book"));
require("./models/Book");
require("./models/User");
require("./models/Category");
var books = require("./routes/book.js");
var users = require("./routes/user.js");
var categories = require("./routes/category.js");
app.use("/books", books);
app.use("/users", users);
app.use("/categories", categories);
app.use(
  "/routes/uploads",
  express.static(path.join(__dirname, "routes/uploads"))
);
app.use("/uploads,", express.static("uploads"));
app.listen(process.env.PORT, () => {
  console.log("Server started at port: ${process.env.PORT}");
});
