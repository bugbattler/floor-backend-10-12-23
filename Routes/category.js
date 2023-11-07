const { getCategories,getCategory,createCategory,
    updateCategory,deleteById, createCategoryTemp,getCat,getAllCategories,getSinglecat,UploadcategoryImage } =require("../Controllers/category");
const multer =require('multer')
const express = require('express');
const { upload } = require("../middleware/MulterFile");
const router = express.Router();
router.get('/category/getCat',getCategories);
router.get('/category/getCat/:id',getCategories);
router.get('/category/getAllCat',getAllCategories);
// router.get('/category/getOne',getCategory);
// router.get('/category/getOne/:id',getCategory);
// router.put('/category/update/:id',upload.single('categoryImage'),updateCategory);
// router.post('/category/create',upload.single('categoryImage'),createCategory);
router.post('/category/createTemp',createCategoryTemp);
router.delete('/category/delete/:id',deleteById);
router.get('/category/get',getCategory);
// router.get('/getcategory/get/:id',getCat);
router.get('/getcategory/get/:id',getSinglecat);
router.put('/category/files/:id',upload.single('categoryImage'),UploadcategoryImage);





module.exports = router;