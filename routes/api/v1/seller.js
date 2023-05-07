const express = require('express');
const router =express.Router();

const sellerApi = require('../../../controllers/api/v1/seller_api');

router.post('/sell-product',sellerApi.sellProduct);

module.exports = router