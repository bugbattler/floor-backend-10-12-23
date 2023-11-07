const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  ProductName: { type: String },
  slug: { type: String },
  SKU:{type:String},
  room: {type:Array},
  boxQuantity: { type: Number },
  sellPrice: { type: Number },
  perBoxPrice: { type: Number },
  boxCovrage: { type: String },
  img: { type: String },
  identifierID: { type: String },
  isOrder: { type: Boolean },
});

module.exports = mongoose.model("Cart", cartSchema);
