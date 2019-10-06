const express = require('express');
const router = express.Router();
require('../models/provisionalDB');

/*************************************************** GET ***********************************************************/
  
router.get('/states/:country_name', (req, res) => {
  //res.send('This is supposed to give the holidays of all the states of the country \n');
  _country = req.params.country_name;
  exists = false;
  _holidays = [];

  for (state of global.states){
    if(state.country == _country){
      exists = true;
        for(holiday of state.holidays){
          _holidays.push(holiday);
        }
    }
  }
  res.setHeader('Content-Type','application/json');
  exists ? res.status(200).send(JSON.stringify(_holidays)) : res.status(404).send("Not found");
  

});

router.get('/:name', (req, res) => {
  //res.send('This is supposed to give the holidays from the country named ' + req.params.name);
  _country = req.params.name;
  _holidays = [];
  exists=false;

  for (country of global.countries){
    if(country.name == _country){
      _holidays = country.holidays;
      exists = true;
      break;
    }
  }
  res.setHeader('Content-Type','application/json');
  exists ? res.status(200).send(JSON.stringify(country.holidays)) : res.status(404).send("Not found");
});

/*************************************************** POST ***********************************************************/

router.post(
  '/new',(req, res) => {
    console.log(req.body);
    //TODO
  }
);

router.post('/:name', (req, res) => {
  res.send('Create new holidays to country with name :name \n');
  //TODO
});

module.exports = router;