const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/websultanate_carts');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting MOngoDB'));

db.once('open',function(){
    console.log("connected to the database websultanate_carts"); 
})