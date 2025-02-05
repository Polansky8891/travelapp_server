const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    country:{
        type: String,
        required: true,
        trim: true
    }
});

const City = mongoose.model('City', citySchema);

module.exports = City;