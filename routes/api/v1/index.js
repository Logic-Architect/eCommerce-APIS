const express = require('express');
const router =express.Router();

// User Routes 
router.use('/user',require('./user'));

// View Product Routes 
router.use('/product',require('./product'))

// Seller Routes 
router.use('/seller',require('./seller'));

module.exports = router