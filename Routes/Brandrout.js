const express = require('express');
const { upload } = require('../middleware/MulterFile');
const router = express.Router();

// Create Address routes
router.post('/brand/create', require('../Controllers/BrandCtl').createBrand);

// Get Address routes
router.get('/brand/getAll', require('../Controllers/BrandCtl').getBrand);
router.get('/brand/get/:id', require('../Controllers/BrandCtl').getSingleBrand);

// Delete Address routes
router.delete('/brand/:id', require('../Controllers/BrandCtl').deleteBrand);

// Update Address routes
router.put('/brand/:id' , require('./../Controllers/BrandCtl').updateBrand);
router.put('/brand/files/:id',upload.single('brandLogo'),require('./../Controllers/BrandCtl').UploadBrandImage);


module.exports = router;