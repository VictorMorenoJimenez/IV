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
    state_name = req.params.state_name;
    let query = State.find({name: state_name}, {holidays: 1, _id: 0})

    query.exec( (err, state) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(200).json(state);
    })
}

/**
 * POST /state/:state_name, create holiday on state :state_name 
 */
function newStateHoliday(req, res) {
    var newHoliday = req.body;
    state = req.params.state_name;
    
    let query = State.updateOne({name: state}, {$addToSet: {holidays: newHoliday, upsert: true}})

    query.exec( (err, holidays) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(200).json({message:"Holiday successfully added to state"});
    })
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
            res.status(201).json({message: "State successfully added!", state})
        }
        
    });
}

/**
 * DELETE /state/:state_name delete holiday from state
 */
function deleteHoliday(req, res) {
    var state = req.params.state_name;
    var n_description = req.body.description;
    let query = State.updateOne({ 'name': state }, { '$pull': { holidays: { description: n_description }}})

    query.exec( (err, holidays) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(200).json({message:"Holiday removed successfully"});
    })
}

module.exports = { getStatebyName, newStateHoliday, newState, getStates, deleteHoliday };