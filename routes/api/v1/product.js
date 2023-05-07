const express = require('express');
const router =express.Router();

const productApi = require('../../../controllers/api/v1/product_api');

router.get('/view-all',productApi.viewAll);

module.exports = router