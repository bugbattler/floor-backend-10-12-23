const express = require('express');
const router = express.Router();

router.post('/order/create', require('../Controllers/Order').createOrder);
router.get('/order/get', require('../Controllers/Order').getOrder);
router.get('/order/:id', require('../Controllers/Order').getOrderByUser);
router.delete('/order/:id', require('../Controllers/Order').deleteOrder);
router.put('/order/:identifier' , require('./../Controllers/Order').updateOrder);


module.exports = router;