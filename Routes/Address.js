const express = require('express');
const router = express.Router();

// Create Address routes
router.post('/address/create', require('../Controllers/Address').createAddress);

// Get Address routes
router.get('/address/getAll', require('../Controllers/Address').getAddress);
router.get('/address/get/:UserId', require('../Controllers/Address').getSingleAddress);

// Delete Address routes
router.delete('/address/:id', require('../Controllers/Address').deleteAddress);

// Update Address routes
router.put('/address/:id' , require('./../Controllers/Address').updateAddress);


module.exports = router;