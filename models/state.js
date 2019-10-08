const mongoose = require('mongoose');

const StateSchema = mongoose.Schema({
    name: { type: String, required: true },
    holidays: 
        [
            {
                day: {type: Number, required: true},
                month: {type: Number, required: true},
                description: { type: String, required: true }
            },
        ],
    country: { type: String, required: true },
    cities: { type: [String], required: true },
});

module.exports = mongoose.model('State', StateSchema);