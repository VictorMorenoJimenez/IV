let State = require('../models/state');
let Country = require('../models/country');
let City = require('../models/city');

let validate = require('../models/joi');


async function getCountryHolidays(country_name){

    holidays = await Country.find({name: country_name}, {holidays: 1, _id: 0},
        function(err, holidays){
            if (err) return handleError(err);
            return holidays;
        });

    return holidays[0].holidays;
}

async function getStateHolidays(state_name){
    holidays_state = await State.find({name: state_name}, {_id: 0},
        function(err, holidays){
            if (err) return handleError(err);
            return holidays;
        });

    console.log(holidays_state[0].country);
    holidays_country = await getCountryHolidays(holidays_state[0].country)

    return holidays_country.concat(holidays_state[0].holidays);
}

async function getCityHolidays(city_name){
    city = await City.find({name: city_name}, {_id: 0},
        function(err, holidays){
            if (err) return handleError(err);
            return holidays;
        });

    console.log(city[0].country + " " + city[0].state);
    holidays_state = await getStateHolidays(city[0].state);


    return city[0].holidays.concat(holidays_state);

}

module.exports = { getCountryHolidays, getStateHolidays, getCityHolidays }

