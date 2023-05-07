const { Decimal128 } = require('bson');
const mongoose = require('mongoose');
const { float } = require('webidl-conversions');

const productSchema = new mongoose.Schema({
    seller_email : {
        type : String,
        required : true
    },
    seller_name : {
        type : String,
        required : true
    },
    product_name :{
        type : String,
        required : true
    }, 
    // THE item_count FIELD HERE INDICATES HOW MANY ITEMS IS THE SELLER SELLING 
    item_count : {
        type : Number,
        required : true
    }, 
    buy_price : {
        type : Number,
        required : true
    }, 
    sell_price : {
        type : Number,
        required : true
    }, 
    discount : {
        type : Number,
        // required :true
    }
},{
    timestamps : true
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product