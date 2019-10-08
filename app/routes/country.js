let mongoose = require('mongoose');
let Country = require('../../models/country');
const db = require('../app.js');

/**
 * GET /country, get all the countries holidays.
 */

function getCountries(req, res) {
    let query = Country.find({});

    query.exec( (err, countries) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(200).json(countries);
    })
}

/**
 * GET /country/states/:country_name get holidays from all states of country_name
 */
function getStates(req, res) {
    country = req.params.country_name;
    // TODO no es la funcionalidad requerida.

}

/**
 * GET /country/:country_name, get all country_name holidays .
 */
function getCountryHolidays(req, res) {
    Country.findById(req.params.country_name, (err, countries) => {
        if(err){
            res.send(err);
        }
        res.json(countries);
    });
}

/**
 * POST /country/:country_name, create holiday on country :country_name 
 */
function newCountryHoliday(req, res) {
    var newHoliday = req.body;
    country = req.params.country_name;
    //TODO
    
}

/**
 * POST /country/new, make a new country.
 */
function newCountry(req, res) {
    //TODO validate
    var newCountry = new Country(req.body);

    //Store on DB
    newCountry.save((err,country) =>{
        if(err){
            res.send(err);
        }else{
            res.status(201).json({message: "Country successfully added!", country})
        }
    });
}

module.exports = { getCountries, newCountry, getCountryHolidays, newCountryHoliday };
