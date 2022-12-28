const express = require("express");
const router = express.Router();
const dbo = require("../db.js");
const mongoose = require("mongoose");
const categoryController = require("../controllers/categoryController");
const Category = mongoose.model("category");

router.get("/getCategories", categoryController.getCategories);

router.post("/addCategory", categoryController.addCategory);

module.exports = router;
