const costModel =require("../Models/CostEstimation");
const slugify =require('slugify');
function createCosts(costs, parentId ) {
    const CostList = [];
    let Cost;
    if (parentId == null) {
        Cost = costs.filter((cat) => cat.parentId == "");
    } else {
        Cost = costs.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of Cost) {
      CostList.push({
        _id: cate._id,
        name: cate.name,
        parentId: cate.parentId,
        type: cate.type,
        parentName:cate.parentName,
        price:cate.price,
        children: createCosts(costs, cate._id),
      });
    }
  
    return CostList;
  }
exports.createCost = async (req,res)=>{
    const {
        name,
        parentId,
        parentName,
        price,
        type,
    } = req.body;
  
    const cat = new costModel({
        name,
        slug:`${slugify(req.body.name)}`,
        parentId,
        parentName,
        price,
        type,
    })
      
      cat.save((error, cost) => {
        if (error) return res.status(400).json({ error });
        if (cost) {
          return res.status(201).json( cost );
        }
      });
};
exports.getCost = (req,res)=>{
  const id =req.params.id
    costModel.find().exec((error, costs) => {
    if (error) return res.status(400).json({ error });
    if (costs) {
      const costList = createCosts(costs,id);
      res.status(200).json( costList );
    }
  });
};
exports.deleteById = (req,res)=>{
  costModel.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            res.json({err});
        }else{
            res.json(data);
        }
    });
}

exports.getCostsArray = (req,res)=>{
  costModel.find().exec((error, cost) => {
    if (error) return res.status(400).json({ error });
    if (cost) {
      res.status(200).json( cost );
    }
  });
}
exports.getSingleCost = async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await costModel.find({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    res.json({ err });
  }
};


