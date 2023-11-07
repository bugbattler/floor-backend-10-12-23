const express = require('express');
// const { adminMiddleware, requireSignin, userMiddleware } = require('../Common middleware');
const router = express.Router();

router.post('/cart/create', require('../Controllers/Cart').createCart);
router.get('/cart/get', require('../Controllers/Cart').getCart);
router.get('/cart/:id', require('../Controllers/Cart').getCartByUniqueID);
router.delete('/cart/:id', require('../Controllers/Cart').deleteCart);
router.put('/cart/:identifier' , require('./../Controllers/Cart').updateCart);


module.exports = router;