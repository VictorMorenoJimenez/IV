const express = require('express');
require('../models/provisionalDB');
const router = express.Router();

/*************************************************** GET ***********************************************************/

/*router.get('/:state_name', (req, res) => {
  //res.send('get the holidays from all the cities that belongs to the state named ' + req.params.country_name );
  _state_name = req.params.state_name;

  for(city of global.cities){
    if(city.state == _state_name){

    }
  }
});*/

router.get('/:country_name/:state_name', (req, res) => {
  //res.send('get the holidays from the state with name ' + req.params.state_name + ' that belongs to country ' + req.params.country_name);
  _country = req.params.country_name;
  _state = req.params.state_name;
  _holidays = [];
  exists = false;

  for (state of global.states){
    if(state.name == _state && state.country == _country){
      exists = true;
      _holidays = state.holidays;
      break;
    }
  }

  res.setHeader('Content-Type','application/json');
  exists ? res.status(200).send(JSON.stringify(state.holidays)) : res.status(404).send("Not found");
});

/*************************************************** POST ***********************************************************/

router.post('/new', (req, res) => {
  res.send('Create new state \n');
  //TODO
});

router.post('/:state_id', (req, res) => {
  res.send('Create new holidays to state with name :state_id \n');
  //TODO
});


module.exports = router;