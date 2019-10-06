const express = require('express');
const router = express.Router();

var cities = require('../models/provisionalDB');
var countries = require('../models/provisionalDB');
var states = require('../models/provisionalDB');

/*************************************************** GET ***********************************************************/

router.get('/', (req, res) => {
  res.send(global.countries[0].name);
});
  
router.get('/states', (req, res) => {
  res.send('This is supposed to give the holidays of all the states of the country \n');
});

router.get('/:name', (req, res) => {
  res.send('This is supposed to give the holidays from the country named ' + req.params.name);
});

/*************************************************** POST ***********************************************************/

router.post(
  '/new',(req, res) => {
    console.log(req.body)
  }
);

router.post('/:name', (req, res) => {
  res.send('Create new holidays to country with name :name \n');
});

module.exports = router;