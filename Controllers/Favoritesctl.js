const FevModel = require('../Models/favoritesmdl');
exports.createFev = async(req,res)=>{
  const {
    userId,
    isFev,
    product
  } = req.body;

  const create_FevModel = new FevModel({
    userId,
    isFev,
    product,
  });

  create_FevModel.save((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      res.status(201).json({ address });
    }
  });
}

// Get all Address's  

exports.getFev = async(req,res)=>{
    try{
        const getFev = await FevModel.find();
        res.json(getFev);
    }
    catch{(err)=>res.json(err)};
}

// Get Address's by ID  
function createFevProduct(products, parentId) {
    const productList = [];
    let product;
  
    if (parentId == null) {
      product = products.filter((pro) => pro.userId === "");
    } else {
      product = products.filter((pro) => pro.userId === parentId);
    }
  
    for (let cate of product) {
      productList.push({
        _id: cate._id,
        isFev: cate.isFev,
        userId: cate.userId,
        children: [...(cate.product || [])],
      });
    }
  
    return productList;
  }
exports.getSingleFev = async (req,res)=>{
    try{
        const Fev = await FevModel.find({_id:req.params.id});
        res.json(Fev);
    }catch(err){
        res.json({err});
    }
}
exports.getFevByUser = async (req,res)=>{
    try{
        const Fev = await FevModel.find({userId:req.params.id});
        res.json(Fev);
    }catch(err){
        res.json({err});
    }
    // const id =req.params.id
    // FevModel.find().exec((error, products) => {
    //     if (error) return res.status(400).json({ error });
    //     if (products) {
    //       const productsList = createFevProduct(products,id);
    //       res.status(200).json( productsList );
    //     }
    //   });
}

// Update Address's by ID  

exports.updateFev = (req,res)=>{
    FevModel.findOneAndUpdate({_id:req.params.id} ,(req.body),{new:true},(err,data)=>{
        try{
            res.json(data);
        }catch(err){
            res.json({err});
        }
    })
}

// Delete Address by ID
exports.deleteFev =(req,res)=>{
    FevModel.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            res.json({err});
        }else{
            res.json(data);
        }
    });
}
