let mongoose = require('mongoose');
let State = require('../../models/state');

/**
 * GET /state, get all the countries holidays.
 */

function getStates(req, res) {
    let query = State.find({});

    query.exec( (err, states) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.json(states);
    })
}

/**
 * GET /state/:state_name get holidays from the state state_name
 */
function getStatebyName(req, res) {
    country = req.params.state_name;
    // TODO no es la funcionalidad requerida.

}

/**
 * POST /state/:state_name, create holiday on state :state_name 
 */
function newStateHoliday(req, res) {
    //TODO
}

/**
 * POST /state/new, create new state
 */
function newState(req, res) {
    var newState = new State(req.body);

    //Store on DB
    newState.save((err,state) =>{
        if(err){
            res.send(err);
        }else{
            res.json({message: "State successfully added!", state})
        }
        
    });
}

module.exports = { getStatebyName, newStateHoliday, newState, getStates };