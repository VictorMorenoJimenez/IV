let mongoose = require('mongoose');
let City = require('../../models/city');
let validate = require('../../models/joi');
const Joi = require('joi')

/**
 * GET /city, get all the cities.
 */

function getCities(req, res) {
    let query = City.find({});

    query.exec( (err, cities) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }else{
            console.log("Get /city get all the cities from DB");
            res.status(200).json(cities);
        }
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
        }else{
            console.log("GET /city/" + city + ". Get the holidays from the city " + city);
            res.status(200).json(city);
        }
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
        }else{
            console.log("PUT /city/" + city + ". Created the holidays on city " + city);
            res.status(201).json({message:"Holiday successfully added to city"});
        }
    })
}

/**
 * PUT /city/new, create new city
 */
function newCity(req, res) {
    var newCity = new City(req.body);
    var nCity = req.body;
    const result = Joi.validate(nCity, validate.cityValidateSchema);
    const { value, error } = result; 
    const valid = error == null; 

    if (!valid) { 
        res.status(422).json({ 
          message: error.message, 
          data: newCity 
        }) 
    }else{
        //Store on DB
        newCity.save((err,city) =>{
            if(err){
                res.send(err);
            }else{
                console.log("PUT /city/new, created new City with the request body in DB");
                res.status(201).json({message: "City successfully added!", city})
            }
        });
    }
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
        }else{
            console.log("DELETE /city/" + city + " deleted city holidays that description matches with request body");
            res.status(200).json({message:"Holiday removed successfully from city"});
        }
    })
}

/**
 * DELETE /delete/city/:city_name delete city city_name
 */
function deleteCity(req, res) {
    var city = req.params.city_name;
    let query = City.deleteOne({ 'name': city })

    query.exec( (err, city) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }else{
            console.log("DELETE /city/delete" + city + " deleted city " + city);
            res.status(200).json({message:"City removed successfully"});
        }
        
    })
}

module.exports = { getCityByName, newCityHoliday, newCity, getCities, deleteHoliday, deleteCity };