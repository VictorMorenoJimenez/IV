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
    let query = City.find({name: city}, {holidays: 1, _id: 0})

    query.exec( (err, city) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(200).json(city);
    })

}

/**
 * PUT /city/:city_name, create holiday on city :city_name 
 */
function newCityHoliday(req, res) {
    var newHoliday = req.body;
    city = req.params.city_name;
    
    let query = City.updateOne({name: city}, {$addToSet: {holidays: newHoliday, upsert: true}})

    query.exec( (err, holidays) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(200).json({message:"Holiday successfully added to city"});
    })
}

/**
 * PUT /city/new, create new city
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

/**
 * DELETE /city/:city_name delete holiday from city
 */
function deleteHoliday(req, res) {
    var city = req.params.city_name;
    var n_description = req.body.description;
    let query = City.updateOne({ 'name': city }, { '$pull': { holidays: { description: n_description }}})

    query.exec( (err, holidays) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(200).json({message:"Holiday removed successfully from city"});
    })
}

module.exports = { getCityByName, newCityHoliday, newCity, getCities, deleteHoliday };