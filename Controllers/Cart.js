const cartModel = require("../Models/Cart");
exports.createCart = async (req, res) => {
    const {
      ProductName,
      slug,
      SKU,
      room,
      boxQuantity,
      sellPrice,
      perBoxPrice,
      boxCovrage,
      identifierID,
      isOrder,
      img,
    } = req.body;
    const newCart = new cartModel({
      ProductName,
      slug,
      SKU,
      room,
      boxQuantity,
      sellPrice,
      perBoxPrice,
      boxCovrage,
      identifierID,
      isOrder,
      img,
    });
    newCart.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: "Something went wrong" });
      }
      if (data) {
        return res
          .status(201)
          .json({
            message: "Product Added To the cart Successfully",
            data,
            toastType: "success",
          });
      }
    });
};

exports.getCart = async (req, res) => {
  try {
    const getCart = await cartModel.find();
    res.json(getCart);
  } catch {
    (err) => res.json(err);
  }
};

exports.getCartByUniqueID = async (req, res) => {
  try {
    const getCart = await cartModel.find({ identifierID: req.params.id });
    // const cartList = Cart(getCart);
    res.json(getCart);
  } catch (err) {
    res.json({ err });
  }
};

exports.updateCart = (req, res) => {
  cartModel.findOneAndUpdate(
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

exports.deleteCart = (req, res) => {
  cartModel.findOneAndDelete(
    { _id: req.params.id },
    (err, data) => {
      if (err) {
        res.json({ err });
      } else {
        res.json(data);
      }
    }
  );
};
