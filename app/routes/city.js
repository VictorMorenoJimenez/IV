let mongoose = require('mongoose');
let City = require('../../models/city');

/**
 * GET /city, get all the cities.
 */

function getCities(req, res) {
    let query = City.find({});

    query.exec( (err, cities) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.json(cities);
    })
}

/**
 * GET /city/:city_name get holidays from the city city_name
 */
function getCityByName(req, res) {
    city = req.params.city_name;
    // TODO no es la funcionalidad requerida.

}

/**
 * POST /city/:city_name, create holiday on city :city_name 
 */
function newCityHoliday(req, res) {
    //TODO
}

/**
 * POST /city/new, create new city
 */
function newCity(req, res) {
    var newCity = new City(req.body);

    //Store on DB
    newCity.save((err,city) =>{
        if(err){
            res.send(err);
        }else{
            res.status(201).json({message: "City successfully added!", city})
        }
        
    });
}

module.exports = { getCityByName, newCityHoliday, newCity, getCities };