const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BookSchema = new Schema({
  title: { type: String },
  yearPublished: { type: String },
  authors: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: "category", default: null },
  description: { type: String },
  picturePath: { type: String },
  numberOfPages: { type: Number },
  isLoaned: { type: Boolean, default: false },
  dateLoaned: { type: Date, default: null },
  loanedUser: { type: Schema.Types.ObjectId, ref: "User", default: null },
});
module.exports = mongoose.model("book", BookSchema);
