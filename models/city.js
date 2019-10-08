const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
    name: { type: String, required: true },
    holidays: 
        [
            {
                day: {type: Number, required: true},
                month: {type: Number, required: true},
                description: { type: String, required: true }
            },
        ],
    state: { type: String, required: true },
    country: { type: String, required: true },
});

module.exports = mongoose.model('City', CitySchema);