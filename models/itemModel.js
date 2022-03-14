const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    brand: String,
    type: String,
    tag: String,
    img: String,
  });
  
  const Item = mongoose.model("Item", itemSchema);
  module.exports=Item;