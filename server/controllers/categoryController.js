const mongoose = require("mongoose");
const e = require("express");
const { json } = require("express");
const Category = mongoose.model("category");

module.exports.getCategories = function (req, res) {
  Category.find(function (err, category) {
    if (err) return handleError(err);
    else {
      res.status(200).json(category);
    }
  });
};
module.exports.addCategory = function (req, res) {
  var category = new Category();
  category.name = req.body.name;
  category.save((err, doc) => {
    console.log(doc);

    if (doc) res.json("Kategorija je uspesno sacuvana!");
    if (err) res.status(404).json("Kategorija neuspesno sacuvana!");
  });
};
