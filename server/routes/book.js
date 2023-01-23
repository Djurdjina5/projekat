const express = require("express");
const router = express.Router();
const dbo = require("../db.js");
const mongoose = require("mongoose");
const bookController = require("../controllers/booksController");
const jwt_verify = require("./verify");
const Book = mongoose.model("book");
const path = require("path");
const fs = require("fs");
var multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads");
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(
        null,
        Date.now() +
          path.basename(file.originalname, ".JPG") +
          path.extname(file.originalname)
      );
    }
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage: storage, fileFilter: fileFilter });
router.post(
  "/storeBook",
  jwt_verify.jwt_verify,
  upload.single("slika"),
  function (req, res, next) {
    var book = new Book();
    book.title = req.body.title;
    console.log(req.body);
    console.log("i am in storeBook");
    book.yearPublished = req.body.yearPublished;
    book.authors = req.body.authors;
    book.category = req.body.category;
    book.description = req.body.description;
    book.numberOfPages = req.body.numberOfPages;
    book.picturePath =
      "http://localhost:5000/routes/uploads/" + req.file.filename;

    // if(req.file) { book.picturePath = path.basename(req.file.filename)} else {korisnik.slika=path.join(__dirname,'uploads/default.png') ;}
    book.save((err, doc) => {
      if (doc) res.json("Knjiga je uspesno sacuvana!");
      if (err) res.status(404).json("Knjiga neuspesno sacuvana!");
    });
  }
);

router.get("/getFreeBooks", jwt_verify.jwt_verify, bookController.getFreeBooks);
router.get("/getBooks", jwt_verify.jwt_verify, bookController.getBooks);
router.post("/loanBook", jwt_verify.jwt_verify, bookController.loanBook);
router.post("/returnBook", jwt_verify.jwt_verify, bookController.returnBook);
router.delete("/deleteBook/:title", jwt_verify.jwt_verify, bookController.deleteBook);
router.post("/searchBooks", jwt_verify.jwt_verify, bookController.searchBooks);
router.post(
  "/getloanedbooks",
  jwt_verify.jwt_verify,
  bookController.getLoanedBooksByUserID
);

module.exports = router;
