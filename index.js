const express = require('express');
const app = express();
const port = 8000;

// Read Post requests 
app.use(express.urlencoded())

// Connecting to the Database 
const db = require('./config/mongoose');
const { urlencoded } = require('body-parser');

// Configuring the routes 
app.use('/',require('./routes'));

// LIstening to the defined Port 
app.listen(port,(err)=>{
    if(err){
        console.log('Unable to connnect to the server',err);
        return;
    }
    console.log(`Successfully connected to the Server at ${port}`);
})