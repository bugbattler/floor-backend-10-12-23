const mongoose = require("mongoose");

const CostEstimationorderSchema = new mongoose.Schema(
  {
    identifier: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    city: { type: String },
    postalCode: { type: String },
    mNo: { type: Number },
    email: { type: String },
    orderItems: { type: Array },
    totalPrice: { type: Number },
    totalSquareFeet: { type: Number },
    isComplete: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CostEstimationOrder", CostEstimationorderSchema);
