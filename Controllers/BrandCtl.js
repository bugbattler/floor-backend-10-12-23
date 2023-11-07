const BrandModel = require('../Models/Brand');
const slugify =require('slugify');
const { uploadsingleToS3 } = require('../middleware/Uploads');

// Create a new Address's 

exports.createBrand = async(req,res)=>{
    // console.log(6,req.body);
  const {
    brand_name,
    brandLogo
  } = req.body;

  const create_brand = new BrandModel({
    brand_name,
    slug:`${slugify(req.body.brand_name)}`,
    brandLogo
  });

  create_brand.save((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      res.status(201).json({ address });
    }
  });
}

// Get all Address's  

exports.getBrand = async(req,res)=>{
    try{
        const getBrand = await BrandModel.find();
        res.json(getBrand);
    }
    catch{(err)=>res.json(err)};
}

// Get Address's by ID  

exports.getSingleBrand = async (req,res)=>{
    try{
        const Brand = await BrandModel.find({brand:req.params.id});
        res.json(Brand);
    }catch(err){
        res.json({err});
    }
}

// Update Address's by ID  

exports.updateBrand = (req,res)=>{
    BrandModel.findOneAndUpdate({_id:req.params.id} ,(req.body),{new:true},(err,data)=>{
        try{
            res.json(data);
        }catch(err){
            res.json({err});
        }
    })
}

// Delete Address by ID
exports.deleteBrand =(req,res)=>{
 
    BrandModel.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            res.json({err});
        }else{
            res.json(data);
        }
    });
}
exports.UploadBrandImage = async (req, res) => {
    let brandLogo;
    if (req.file) {
      let fileData = req.file.buffer;
      let fileType;
      if (req.file.mimetype === "application/pdf") {
        fileType = "pdf";
      } else if (
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/jpg"
      ) {
        fileType = "jpg";
      } else if (req.file.mimetype === "image/png") {
        fileType = "png";
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }
  
      // Call the uploadToS3 function to upload the file to S3
      let { Location } = await uploadsingleToS3(fileData, fileType);
      brandLogo = Location;
    }
    BrandModel.findOneAndUpdate({ _id: req.params.id }, { brandLogo })
      .then((data) => {
        res.status(200).json({
          message: "brandLogo updated successfully",
          data,
        });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  };
