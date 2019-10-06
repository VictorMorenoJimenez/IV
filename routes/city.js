const express = require('express');

const router = express.Router();


/*
    This will handle all request of type /city
    Example first GET its for GET /city/:city_id
 */

router.get('/:state_name', (req, res) => {
    res.send(' get the holidays from all the cities of the state ' + req.params.state_name);
});

router.get('/:state_name/:city_name', (req, res) => {
    res.send('get the holidays from the city with name ' + req.params.city_name + ' from the state ' + req.params.state_name);
});

router.post('/new', (req, res) => {
    res.send('Create new city \n');
});

router.post('/:city_name', (req, res) => {
    res.send('Create new holidays to city with with id city_name  \n');
});


module.exports = router;