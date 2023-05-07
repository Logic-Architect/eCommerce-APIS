const express = require('express');
const router =express.Router();

router.get('/',(req,res)=>{
    return res.send('<h1>Welcome</h1>')
})

// Routes for api 
router.use('/api',require('./api'));

module.exports = router;