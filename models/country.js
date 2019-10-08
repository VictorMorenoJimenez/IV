const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    name: { type: String, required: true },
    holidays: 
        [
            {
                day: {type: Number, required: true},
                month: {type: Number, required: true},
                description: { type: String, required: true }
            },
        ],
    states: { type: [String], required: true }
});

module.exports = mongoose.model('Country', CountrySchema);