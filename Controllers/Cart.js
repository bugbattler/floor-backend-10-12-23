const cartModel = require("../Models/Cart");

// function Cart(data){

// //   for (let i=0; i<data.length; i++){
//     let i=0;
//    const filter= data.filter(data=>data.productId == data[i].productId)
//    return filter;
// //   }
// }

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
//   const find = await cartModel.find({ identifier: req.body.identifier });
//   const isAddon = req.body.isAddon;
//   if (find.length == 0) {
//   } else {
//     if (isAddon) {
//       cartModel.findByIdAndUpdate(
//         { _id: find[0]._id },
//         {
//           $push: { room: req.body.room },
//           $inc: { boxQuantity: req.body.boxQuantity },
//         },
//         (err, data) => {
//           if (err) {
//             console.log(err);
//           } else {
//             res
//               .status(201)
//               .json({
//                 message: "Cart Updated Successfully",
//                 data,
//                 toastType: "success",
//               });
//           }
//         }
//       );
//     } else {
//       res
//         .status(201)
//         .json({ message: "Product Alredy In cart", toastType: "error" });
//     }
//   }
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
    { identifier: req.params.identifier },
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
