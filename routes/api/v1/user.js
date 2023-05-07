const express = require('express');
const router =express.Router();

const userApi = require('../../../controllers/api/v1/user_api');

// Create A user 
router.post('/create',userApi.create);

// Buy an Iten 
router.post('/add-to-cart',userApi.addToCart);

// View User Carts 
router.get('/view-cart/',userApi.viewCart);

module.exports = router