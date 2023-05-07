const mongoose = require('mongoose');


const soldSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: [
        {
            info :{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            // THE item_count FIELD HERE INDICATES HOW MANY ITEMS IS THE USER BUYING
            item_count :{
                type : Number,
            }
        }
    ]
},{
    timestamps : true
});

const Sold = mongoose.model('Sold',soldSchema);

module.exports = Sold;