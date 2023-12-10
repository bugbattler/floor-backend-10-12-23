const express = require('express');
const router = express.Router();

// Create Address routes
router.post('/fev/create', require('../Controllers/Favoritesctl').createFev);

// Get Address routes
router.get('/fev/getAll', require('../Controllers/Favoritesctl').getFev);
router.get('/fev/get/:id', require('../Controllers/Favoritesctl').getFevByUser);
router.get('/fev/getsingle/:id', require('../Controllers/Favoritesctl').getSingleFev);

// Delete Address routes
router.delete('/fev/delete/:id', require('../Controllers/Favoritesctl').deleteFev);

// Update Address routes
router.put('/fev/:id' , require('./../Controllers/Favoritesctl').updateFev);


module.exports = router;