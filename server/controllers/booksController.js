const mongoose = require("mongoose");
const e = require("express");
const { json } = require("express");
const Book = mongoose.model("book");

module.exports.getBooks = function (req, res) {
  Book.find({ isLoaned: true })
    .populate("category", "name")
    .exec(function (err, books) {
      if (err) return res.status(404).json(err);
      else {
        res.status(200).json(books);
      }
    });
};

module.exports.getFreeBooks = function (req, res) {
  Book.find({ loanedUser: null })
    .populate("category", "name")
    .exec(function (err, books) {
      if (err) return res.status(404).json(err);
      else {
        res.status(200).json(books);
      }
    });
};

module.exports.loanBook = function (req, res) {
  console.log(req.body.title);
  console.log(req.body.user_id);
  let date = new Date();
  const loaned_days = 14;
  let dateloaned = date.setDate(date.getDate());
  let datereturned = date.setDate(date.getDate() + loaned_days);

  let day = date.getDate() + 14;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let format2 = day + "/" + month + "/" + year;

  Book.findOneAndUpdate(
    { title: req.body.title },
    {
      isLoaned: true,
      loanedUser: req.body.user_id,
      dateLoaned: dateloaned,
      dateReturned: format2,
    },
    function (err, doc) {
      if (err) {
        console.log("Error in loan book");
        res.status(401).json({ error: "Error in loan book" });
      } else {
        return res.status(200).json({ message: "Book succesfully loaned" });
      }
    }
  );
};

module.exports.returnBook = function (req, res) {
  console.log("I am in return book");
  console.log(req.body.title);
  Book.findOneAndUpdate(
    { title: req.body.title },
    { isLoaned: false, loanedUser: null },
    function (err, doc) {
      if (err) {
        console.log("Error in return book");
        res.status(401).json({ error: "Error in return book" });
      } else {
        return res.status(200).json({ message: "Book succesfully returned" });
      }
    }
  );
};

module.exports.deleteBook = function (req, res) {
  console.log("I am in delete book");
  console.log(req.params.title);

  Book.findOneAndRemove({ title: req.params.title }, function (err, doc) {
    if (err) {
      return res
        .status(401)
        .json({ error: "Error book unsuccesfully deleted" });
    } else {
      return res.status(200).json({ message: "Book sucessfully deleted" });
    }
  });
};
module.exports.getLoanedBooksByUserID = function (req, res) {
  console.log("loaned book funckija");
  console.log(req.body.userID);
  id = req.body.userID;
  Book.find({ isLoaned: true, loanedUser: id })
    .populate("category", "name")
    .exec(function (err, books) {
      if (err) return res.status(404).json(err);
      else {
        res.status(200).json(books);
      }
    });
};
module.exports.searchBooks = function (req, res) {
  console.log(req.body);
  authors = req.body.authors ? req.body.authors : ".";
  title = req.body.title ? req.body.title : ".";
  // authors = "*" + authors + "*";
  console.log(authors);
  console.log(title);
  // console.log(category);
  Book.find({
    $and: [{ authors: { $regex: authors } }, { title: { $regex: title } }],
  }).then((books) => {
    if (books) {
      console.log(books);
      res.status(200).json(books);
    } else {
      res.status(401).json("There are no books with that parameters!");
    }
  });
};
