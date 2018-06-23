//intialise the restaurant collection schema for MongoDB test database
var mongoose = require('mongoose');
var restaurantSchema = new mongoose.Schema({
    restaurant_id: Number,
    name: String,
    cuisine: String,
    borough: String,
    grades: { grade: String, score: Number },
    lower: Number,
    upper: Number,
    address: { building: String, building: String, street: String, coord: String, zipcode: String },
    reviews: [{
        rName: {type: String, default: 'Anonymus'},
        rComment: String
    }]
});
mongoose.model('Restaurants', restaurantSchema);
