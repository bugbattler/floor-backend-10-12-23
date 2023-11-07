// const Category = require("../Models/Catagories");
// const slugify = require("slugify");

// function createCategories(categories, parentId = null) {
//   const categoryList = [];
//   let category;
//   if (parentId == null) {
//     category = categories.filter((cat) => cat.parentId == undefined);
//   } else {
//     category = categories.filter((cat) => cat.parentId == parentId);
//   }

//   for (let cate of category) {
//     categoryList.push({
//       _id: cate._id,
//       name: cate.name,
//       slug: cate.slug,
//       parentId: cate.parentId,
//       type: cate.type,
//       children: createCategories(categories, cate._id),
//     });
//   }
//   return categoryList;
// }

// exports.addCategory = (req, res) => {
//  console.log(28,req.body);
//   if (req.file) {
//     categoryObj.categoryImage = "/public/" + req.file.filename;
//   }
 
//   const categoryObj = {
//     name: req.body.name,
//     slug: `${slugify(req.body.name)}`,
//   };
//   if (req.file) {
//     categoryObj.catagoryImage = process.env.APP_API+ '/public/' + req.file.filename
//   }
//   if (req.body.parentId) {
//     categoryObj.parentId = req.body.parentId;
//   }

//   const cat = new Category(categoryObj);
//   cat.save((error, category) => {
//     if (error) return res.status(400).json({ error });
//     if (category) {
//       return res.status(201).json({ category });
//     }
//   });
// };

// exports.getCategories = (req, res) => {
//   console.log(54,res)
//   const search = req.query.key || '';
//   Category.find({}).exec((error, categories) => {
//     if (error) return res.status(400).json({ error });
//     if (categories) {
//       const categoryList = createCategories(categories);
//       res.status(200).json({ categoryList });
//     }
//   });
// };
// exports.getAllCategories = async (req, res) => {
//   console.log(res);
//   try {
//     const data = await Category.find();
//     res.json(data);
//   } catch {
//     (err) => res.json(err);
//   }
// };

// exports.updateCategories = (req,res)=>{
//   Category.findOneAndUpdate({_id:req.params.id} ,(req.body),{new:true},(err,data)=>{
//       try{
//           res.json(data);
//       }catch(err){
//           res.json({err});
//       }
//   })
// }


// exports.deleteCategories =(req,res)=>{

//   Category.findOneAndDelete({_id:req.params.id},(err,data)=>{
//       if(err){
//           res.json({err});
//       }else{
//           res.json(data);
//       }
//   });
// }
