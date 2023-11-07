const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    orderItems: { type: Array },
    isAddon: { type: Boolean, default: false },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    nearByLocation: { type: String },
    country: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    mNo: { type: Number },
    email: { type: String },
    paymentMethod: { type: String },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: String, default: "Ordered" },
    deliveredAt: { type: Date },
    expectedDeliveryDate: { type: Date },
    expectedDeliveryTime: { type: String },
    addOn: { type: Boolean, default: false },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
