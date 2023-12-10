const express = require('express');
const router = express.Router();

router.post('/InstallationOrder/create', require('../Controllers/CostEstimationOrderctl').createOrder);
router.get('/InstallationOrder/get', require('../Controllers/CostEstimationOrderctl').getOrder);
router.get('/InstallationOrder/:id', require('../Controllers/CostEstimationOrderctl').getOrderByUser);
router.delete('/InstallationOrder/:id', require('../Controllers/CostEstimationOrderctl').deleteOrder);
router.put('/InstallationOrder/:identifier' , require('./../Controllers/CostEstimationOrderctl').updateOrder);


module.exports = router;