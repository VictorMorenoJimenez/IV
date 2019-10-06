const express = require('express');

const router = express.Router();
  
router.get('/:country_name', (req, res) => {
  res.send('get the holidays from all the states that belongs to the country named ' + req.params.country_name );
});

router.get('/:country_name/:state_name', (req, res) => {
  res.send('get the holidays from the state with name ' + req.params.state_name + ' that belongs to country ' + req.params.country_name);
});

router.post('/new', (req, res) => {
  res.send('Create new state \n');
});

router.post('/:state_id', (req, res) => {
  res.send('Create new holidays to state with name :state_id \n');
});


module.exports = router;