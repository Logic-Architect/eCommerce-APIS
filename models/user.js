const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        // required : true
    },
    state: {
        type: String,
        // required : true
    },
    country: {
        type: String,
        // required : true
    },
    phone: {
        type: String,
        // required : true
    }

}, {
    timestamps : true
})

const User = mongoose.model('User', userSchema);

module.exports = User