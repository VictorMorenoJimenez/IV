let Country = require('../../models/country');
let validate = require('../../models/joi');
const Joi = require('joi')
const Controller  = require('../controller')

/**
 * GET /status, get status test..
 */

function getStatus(req, res) {

    res.status(200).json(
        {
            "status": "OK"
        }
    )
    console.log("Getting sample /status, status OK")
}


/**
 * GET /country, get all the countries holidays.
 */

function getCountries(req, res) {
    let query = Country.find({});

    query.exec( (err, countries) =>{
        //Check if no errors and send json back
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log("Get /country get all the countries from DB");
            res.status(200).json(countries);
        }
        
    })
}

/**
 * GET /country/:country_name, get all country_name holidays .
 */
async function getCountryHolidays(req, res) {
    country_name = req.params.country_name;

    /*query.exec( (err, country) =>{
        //Check if no errors and send json back
        if(err){
            console.log(err);
            res.send(err);
        } else{
            
            console.log("GET /country/" + country_name + ". Get the holidays from the country " + country_name);
        }
    })*/

    holidays = await Controller.getCountryHolidays(country_name);

    console.log("GET /country/" + country_name + ". Get the holidays from the country " + country_name);
    res.status(200).json(holidays);

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
            console.log(err);
            res.send(err);
        }else{
            res.status(201).json({message:"Holiday successfully added to country"});
            console.log("PUT /country/" + country + ". Created the holidays on country " + country);
        }
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
            console.log(err);
            res.send(err);
        }
        else{
            res.status(201).json({message:"State successfully added to Country"});
            console.log("PUT /country/state" + country + ". Added state to country " + country);
        }
        
    }) 
}

/**
 * PUT /country/new, make a new country.
 */
function newCountry(req, res) {
    //TODO validate
    var newCountry = new Country(req.body);
    var nCountry = req.body;

    const result = Joi.validate(nCountry, validate.countryValidateSchema);
    const { value, error } = result; 
    const valid = error == null; 

    if (!valid) { 
      res.status(422).json({ 
        message: error.message, 
        data: newCountry 
      }) 
      console.log(error.message);
    } else { 
        //Store on DB
        newCountry.save((err,country) =>{
            if(err){
                console.log(err);
                res.send(err);
            }else{
                console.log("PUT /country/new, created new Country with the request body in DB");
                res.status(201).json({message: "Country successfully added!", nCountry})
            }
        });
    }
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
            console.log(err);
            res.send(err);
        }else{
            console.log("DELETE /country/" + country_name + " deleted country holidays ");
            res.status(200).json({message:"Holiday removed successfully"});
        }
        
    })
}

/**
 * DELETE /country/delete/:country_name delete country
 */
function deleteCountry(req, res) {
    var country_name = req.params.country_name;

    let query = Country.deleteOne({ 'name': country_name })

    query.exec( (err, holidays) =>{
        //Check if no errors and send json back
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log("DELETE /country/delete" + country_name + " deleted country " + country_name);
            res.status(200).json({message:"Country removed successfully"});
        }
        
    })
}





module.exports = { getCountries, newCountry, getCountryHolidays, newCountryHoliday, deleteHoliday, addState, deleteCountry, getStatus };
