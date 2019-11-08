let State = require('../models/state');
let Country = require('../models/country');
let City = require('../models/city');

async function getCountryHolidays(country_name){

    try{
        holidays = await Country.find({name: country_name}, {holidays: 1, _id: 0},
            function(err, holidays){
                try{
                    return holidays;
                }catch(err){
                    console.log(err);
                }
            });
        return holidays[0].holidays;
    }catch(e){
        console.log(e);
    }

}

async function getStateHolidays(state_name){
    try{
        holidays_state = await State.find({name: state_name}, {_id: 0},
            function(err, holidays){
                if (err) return handleError(err);
                return holidays;
            });
    } catch(e){
        console.log(e);
    }


    //console.log(holidays_state[0].country);
    try{
        holidays_country = await getCountryHolidays(holidays_state[0].country)
        return holidays_country.concat(holidays_state[0].holidays);
    } catch(e){
        console.log(e);
    }

}

async function getCityHolidays(city_name){
    try{
        city = await City.find({name: city_name}, {_id: 0},
            function(err, holidays){
                if (err) return handleError(err);
                return holidays;
            });
    } catch(e){
        console.log(e);
    }


    console.log(city[0].country + " " + city[0].state);

    try{
        holidays_state = await getStateHolidays(city[0].state);
        return city[0].holidays.concat(holidays_state);
    } catch(e){
        console.log(e);
    }
}

function getCities(){
    let query = City.find({});

    query.exec( (err, cities) =>{
        //Check if no errors and send json back
        if(err){
            console.log(err);
        }else{
            return cities;
        }
    })
}




module.exports = { getCountryHolidays, getStateHolidays, getCityHolidays, getCities}

