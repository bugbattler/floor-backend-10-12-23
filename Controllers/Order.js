const orderSchema = require("../Models/Order");
const env = require("dotenv");
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_KtizL33tLNoct4",
  key_secret: "hFmixRTO0SEIjJlqOmYgzjKI",
});
// Create a new Order

exports.createOrder = async (req, res) => {
  // const orderItems = []
  // if(req.body.orderItems.length > 0){
  //     orderItems = req.body.orderItems.map((order) => {
  //       return { item: order };
  //     })
  //   }
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};


//  Get All Order
exports.createOrderCOD = async(req,res)=>{
  try{
      const saveData = await new orderSchema(req.body).save();
      res.json(saveData);
      res.redirect(
        `http://localhost:3000/shop/dashboard/`
      );
  }
  catch{(err)=>res.json(err)};
}

// "_id": "63879c9493108ee56aa1eede",
//         "userId": "638070af833fc7cff2e7f049",
//         "orderItems": [
//             {
//                 "_id": "63879bf293108ee56aa1ee66",
//                 "user": "638070af833fc7cff2e7f049",
//                 "slug": "romantic-birthday-room-decoration",
//                 "quantity": 1,
//                 "identifier": "638070af833fc7cff2e7f049romantic-birthday-room-decoration",
//                 "__v": 0
//             }
//         ],
//         "firstName": "Prathmesh",
//         "lastName": "Jadhav",
//         "address": "Malvadi, velugaon, kedshivapur, Pune",
//         "nearByLocation": "dd",
//         "country": "India",
//         "city": "Pune",
//         "state": "Maharashtra",
//         "postalCode": "412205",
//         "mNo": 9325795236,
//         "email": "prathmeshjadhav1014@gmail.com",
//         "paymentMethod": "Razorpay",
//         "shippingPrice": 0,
//         "totalPrice": 3050,
//         "isPaid": true,
//         "paidAt": "2022-11-30T18:10:27.999Z",
//         "isDelivered": false,
//         "expectedDeliveryDate": "2022-11-30T17:28:33.301Z",
//         "expectedDeliveryTime": " 6pm to 9pm",
//         "addOn": false,
//         "razorpay_order_id": "order_KmLOcaDFfCDN9N",
//         "razorpay_payment_id": "pay_KmLOsLvjbzgqym",

exports.getOrder = async (req, res) => {
  const search = req.query.key || '';
  try{
    orderSchema.find({userId:{$regex:search,$options:'$i'}})
    .then(data=>{
      if (data === 0) {
        res.status(400).json({ error: "No Products Found" });
      } else {
          res.status(200).json({ data });
      }
    })
  }catch(err){
      res.json({err});
  }
};


exports.getOrderByUser = async (req,res)=>{
  try{
      const user = await orderSchema.find({userId:req.params.id});
      res.json(user);
  }catch(err){
      res.json({err});
  }
}
exports.getOrderById = async (req,res)=>{
  try{
      const user = await orderSchema.find({_id:req.params.Oid});
      res.json(user);
  }catch(err){
      res.json({err});
  }
}

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
