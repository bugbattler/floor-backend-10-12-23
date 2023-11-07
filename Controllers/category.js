const categoryModel =require("../Models/category");
// const slug = require('slug');
const slugify =require('slugify');
const {uploadsingleToS3,uploadToS3} = require("../middleware/Uploads");
// import {uploadToS3} from '../routes/category.js';


//create categories function
function createCategories(categories, parentId ) {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == "");
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        parentId: cate.parentId,
        Type: cate.Type,
        parentName:cate.parentName,
        children: createCategories(categories, cate._id),
        categoryImage: cate.categoryImage
      });
    }
  
    return categoryList;
  }
// function createAllCategory(categories,type) {
//     const categoryList = [];
//     let category;
//     if (type == null) {
//       category = categories.filter((cat) => cat.Type == type);
//     } else {
//       category = categories.filter((cat) => cat.Type == type);
//     }

//     for (let cate of category) {
//       categoryList.push({
//         _id: cate._id,
//         name: cate.name,
//         parentId: cate.parentId,
//         Type: cate.Type,
//         parentName:cate.parentName,
//         children: createAllCategory(categories,"Cat"),
//         categoryImage: cate.categoryImage
//       });
//     }
  
//     return categoryList;
//   }


// exports.createCategory = async (req,res)=>{
//   console.log(req.body)
//   let categoryImage;
//   await uploadToS3(req.file.buffer).then(res=>{
//     categoryImage = res.Location
//     });
    
//     const categoryObj = {
//         name: req.body.name,
//         slug: `${slug(req.body.name)}`,
//         categoryImage
//       };
//       if (req.body.parentId) {
//         categoryObj.parentId = req.body.parentId;
//       }
//       const cat = new categoryModel(categoryObj);
//       cat.save((error, category) => {
//         if (error) return res.status(400).json({ error });
//         if (category) {
//           return res.status(201).json({ category });
//         }
//       });
// };
exports.createCategoryTemp = async (req,res)=>{
    const {
      name,
      slug,
      categoryImage,
      parentId,
      parentName,
      superCatName,
      Type,
    } = req.body;
  
    const cat = new categoryModel({
      name,
      slug:`${slugify(req.body.name)}`,
      categoryImage,
      parentId,
      parentName,
      superCatName,
      Type,
    })
      
      cat.save((error, category) => {
        if (error) return res.status(400).json({ error });
        if (category) {
          return res.status(201).json({ category });
        }
      });
};
exports.getCategories = (req,res)=>{
  const id =req.params.id
    categoryModel.find().exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories,id);
      res.status(200).json({ categoryList });
    }
  });
};
exports.getAllCategories = (req,res)=>{
  const type = "Super_Cat"
    categoryModel.find().exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createAllCategory(categories,type);
      res.status(200).json({ categoryList });
    }
  });
};
exports.getCat = (req,res)=>{
    categoryModel.find().exec((error, categories) => {
// console.log(102,categories)
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};


exports.updateCategory = async (req,res)=>{
  let categoryImage;
  await uploadToS3(req.file.buffer).then(res=>{
    categoryImage = res.Location
    });
    req.body.categoryImage = categoryImage;
    categoryModel.findOneAndUpdate({_id:req.params.id} ,(req.body),{new:true},(err,data)=>{
        try{
            res.json(data);
        }catch(err){
            res.json({err});
        }
    })
};


exports.deleteById = (req,res)=>{
  categoryModel.findOneAndDelete({_id:req.params.id},(err,data)=>{
        if(err){
            res.json({err});
        }else{
            res.json(data);
        }
    });
}

exports.getCategory = (req,res)=>{
  categoryModel.find().exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      res.status(200).json({ categories });
    }
  });
}
exports.getSinglecat = async (req, res) => {
  console.log(req.params.id);
  try {
    const cat = await categoryModel.find({ _id: req.params.id });
    res.json(cat);
  } catch (err) {
    res.json({ err });
  }
};

exports.UploadcategoryImage = async (req, res) => {
  let categoryImage;
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
    categoryImage = Location;
  }
  categoryModel.findOneAndUpdate({ _id: req.params.id }, { categoryImage })
    .then((data) => {
      res.status(200).json({
        message: "categoryImage updated successfully",
        data,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

