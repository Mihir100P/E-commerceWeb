const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  totalPrice: Number,
  quantity:Number,
  company:String,
  image:String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  item:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  status:{
    type:String,
    default:"pending",
    enum: ["pending", "processing", "shipping", "delivered", "cancelled"],
  },
  date:{
   type: Date,
    default: Date.now,
  },
},{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
