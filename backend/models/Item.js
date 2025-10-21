const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  maxQuantity:Number,
  company:String,
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  }
});

module.exports = mongoose.model("Item", itemSchema);
