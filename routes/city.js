const express = require('express');
require('../models/provisionalDB');
const router = express.Router();

/*************************************************** GET ***********************************************************/

router.get('/:state_name', (req, res) => {
    //res.send(' get the holidays from all the cities of the state ' + req.params.state_name);
    state_name = req.params.state_name;
    _holidays = [];
    var exists = false;

    for (i = 0; i< global.cities.length; ++i){
        if(global.cities[i].state == state_name){
            exists = true;
            for (j = 0 ; j < global.cities[i].holidays.length ; ++j){
                _holidays.push(global.cities[i].holidays[j]);
            }
        }
    }

    res.setHeader('Content-Type','application/json');
    exists ? res.status(200).send(JSON.stringify(_holidays)) : res.status(404).send('Not found');
});

router.get('/:state_name/:city_name', (req, res) => {
    //res.send('get the holidays from the city with name ' + req.params.city_name + ' from the state ' + req.params.state_name);
    city_name = req.params.city_name;
    state_name = req.params.state_name;
    exists_city = false;
    exists_state = false;

    _holidays = [];
    res.setHeader('Content-Type','application/json');
    for (i = 0; i < global.cities.length && (!exists_city || !exists_state); ++i){
        if (global.cities[i].name == city_name && global.cities[i].state == state_name){
            exists_city = exists_state = true;
            _holidays = global.cities[i].holidays;
        }
    }

    res.setHeader('Content-Type','application/json');
    exists_city && exists_state ? res.status(200).send(JSON.stringify(_holidays)) :  res.status(404).send('Not found');
   
});

/*************************************************** POST ***********************************************************/

router.post('/new', (req, res) => {
    //res.send('Create new city \n');
    /*
        To create a city we need:
        id,
        name,
        holidays,
        state,
        country
     */
    _id = req.body.id;
    _name = req.body.name;
    _holidays = req.body.holidays;
    _state = req.body.state;
    _country = req.body.country;

    n_city = {
        id: _id,
        name: _name,
        holidays: _holidays,
        state: _state,
        country: _country
    }

    //TODO comprobacion de tipos antes de insertar el objecto.
    l_prev = global.cities.length;
    global.cities.push(n_city);
    l_post = global.cities.length;

    l_post > l_prev ? res.status(201).send("City with name " + _name + " created") : res.status(400).send("Error creating the object.");
});

router.post('/:city_name', (req, res) => {
    //res.send('Create new holidays to city with with id city_name  \n');
    //TODO comprobacion de tipos antes de insertar el objecto.
    holiday = req.body.holiday;
    city = req.params.city_name;
    var l_prev;
    var l_post;

    for (c of global.cities){
        if (c.name == city){
            l_prev = c.holidays.length;
            c.holidays.push(holiday);
            l_post = c.holidays.length;
        }
    }

    l_post > l_prev ? res.status(201).send("Holiday " + holiday + " created") : res.status(400).send("Error creating the object.");

});


module.exports = router;