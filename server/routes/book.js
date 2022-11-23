const express = require("express");
const router = express.Router();
const dbo = require("../db.js");
const mongoose = require("mongoose");
const bookController = require("../controllers/booksController");
const Book = mongoose.model("book");


router.get('/getFreeBooks',bookController.getFreeBooks);
router.get('/getBooks',bookController.getBooks);

module.exports = router;
