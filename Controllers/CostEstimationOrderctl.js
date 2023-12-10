const orderSchema = require("../Models/CostEstimationOrder");
const env = require("dotenv");
exports.createOrder = async (req, res) => {
  const {
    identifier,
    firstName,
    lastName,
    city,
    postalCode,
    mNo,
    email,
    orderItems,
    totalPrice,
    totalSquareFeet,
    isComplete,
  } = req.body;
  const newOrder = new orderSchema({
    identifier,
    firstName,
    lastName,
    city,
    postalCode,
    mNo,
    email,
    orderItems,
    totalPrice,
    totalSquareFeet,
    isComplete,
  });
  newOrder.save((error, data) => {
    if (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    if (data) {
      return res.status(201).json({
        message: "Order Placed Successfully..",
        data,
        toastType: "success",
      });
    }
  });
};
exports.getOrder = async (req, res) => {
  const search = req.query.key || "";
  try {
    orderSchema
      .find({ userId: { $regex: search, $options: "$i" } })
      .then((data) => {
        if (data === 0) {
          res.status(400).json({ error: "No Products Found" });
        } else {
          res.status(200).json({ data: data.reverse() });
        }
      });
  } catch (err) {
    res.json({ err });
  }
};

exports.getOrderByUser = async (req, res) => {
  try {
    const user = await orderSchema.find({ identifier: req.params.id });
    res.json(user);
  } catch (err) {
    res.json({ err });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const user = await orderSchema.find({ _id: req.params.Oid });
    res.json(user);
  } catch (err) {
    res.json({ err });
  }
};

//  Delete Order's by ID

exports.deleteOrder = (req, res) => {
  orderSchema.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ err });
    } else {
      res.json(data);
    }
  });
};

//  Update Order's by ID

exports.updateOrder = (req, res) => {
  orderSchema.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, data) => {
      try {
        res.json(data);
      } catch (err) {
        res.json({ err });
      }
    }
  );
};
