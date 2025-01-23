const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    imageUrl:{
        type: String,
        required: true,
    },
    city:{
        type: [String],
        required: true,
        trim: true
    },
    country:{
        type: String,
        required: true,
        trim: true
    },
    days:{
        type: Number,
        required: true,
        trim: true
    },
    type:{
        type: String,
        required: true,
        trim: true
    },
    difficulty:{
        type: Number,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    }
});



// model creation
const Itinerary = mongoose.model('Itinerary', itinerarySchema);



module.exports = Itinerary;

