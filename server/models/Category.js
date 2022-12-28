const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CategorySchema = new Schema({
  name: { type: String },
});
module.exports = mongoose.model("category", CategorySchema);
