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
 * GET /country/:country_name, get all country_name holidays .
 */
function getCountryHolidays(req, res) {
    country_name = req.params.country_name;
    let query = Country.find({name: country_name}, {holidays: 1, _id: 0})

    query.exec( (err, country) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(200).json(country);
    })
}

/**
 * PUT /country/:country_name, create holiday on country :country_name 
 */
function newCountryHoliday(req, res) {
    var newHoliday = req.body;
    country = req.params.country_name;
    
    let query = Country.updateOne({name: country}, {$addToSet: {holidays: newHoliday, upsert: true}})

    query.exec( (err, holidays) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(201).json({message:"Holiday successfully added to country"});
    })
    
}

/**
 * PUT /country/state/:country_name, add state to country country_name
 */
function addState(req, res) {
    var state = req.body.state;
    country = req.params.country_name;
    
    let query = Country.updateOne({name: country}, {$addToSet: {states: state}})

    query.exec( (err, state) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(201).json({message:"State successfully added to Country"});
    }) 
}

/**
 * PUT /country/new, make a new country.
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

/**
 * DELETE /country/:country_name delete holiday from country
 */
function deleteHoliday(req, res) {
    var country_name = req.params.country_name;
    var n_description = req.body.description;
    let query = Country.updateOne({ 'name': country_name }, { '$pull': { holidays: { description: n_description }}})

    query.exec( (err, holidays) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }else{
            res.status(200).json({message:"Holiday removed successfully"});
        }
        
    })
}

/**
 * DELETE /country/delete/:country_name delete holiday from country
 */
function deleteCountry(req, res) {
    var country_name = req.params.country_name;

    let query = Country.deleteOne({ 'name': country_name })

    query.exec( (err, holidays) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }else{
            res.status(200).json({message:"Country removed successfully"});
        }
        
    })
}





module.exports = { getCountries, newCountry, getCountryHolidays, newCountryHoliday, deleteHoliday, addState, deleteCountry };
