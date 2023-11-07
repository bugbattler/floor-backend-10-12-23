const addressModel = require('../Models/Address');

// Create a new Address's 

exports.createAddress = async(req,res)=>{
    // console.log(6,req.body);
  const {
    user,
    firstName,
    lastName,
    cName, // company name
    address,
    nearByLocation,
    city,
    country,
    state,
    postalCode,
    mNo,
    email,
  } = req.body;

  const createAddress = new addressModel({
    user,
    firstName,
    lastName,
    cName, // company name
    address,
    nearByLocation,
    city,
    country,
    state,
    postalCode,
    mNo,
    email
  });

  createAddress.save((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      res.status(201).json({ address });
    }
  });
}

// Get all Address's  

exports.getAddress = async(req,res)=>{
    try{
        const getusers = await addressModel.find();
        res.json(getusers);
    }
    catch{(err)=>res.json(err)};
}

// Get Address's by ID  

exports.getSingleAddress = async (req,res)=>{
    try{
        const user = await addressModel.find({user:req.params.UserId});
        res.json(user);
    }catch(err){
        res.json({err});
    }
}

// Update Address's by ID  

exports.updateAddress = (req,res)=>{
    addressModel.findOneAndUpdate({_id:req.params.id} ,(req.body),{new:true},(err,data)=>{
        try{
            res.json(data);
        }catch(err){
            res.json({err});
        }
    })
}

// Delete Address by ID
exports.deleteAddress =(req,res)=>{
 
    addressModel.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            res.json({err});
        }else{
            res.json(data);
        }
    });
}
