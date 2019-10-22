let mongoose = require('mongoose');
let State = require('../../models/state');
let validate = require('../../models/joi');
const Joi = require('joi')

/**
 * GET /state, get all the states.
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
 * PUT /state/:state_name, create holiday on state :state_name 
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
        res.status(201).json({message:"Holiday successfully added to state"});
    })
}

/**
 * PUT /state/new, create new state
 */
function newState(req, res) {
    var newState = new State(req.body);
    var nState = req.body;
    const result = Joi.validate(nState, validate.stateValidateSchema);
    const { value, error } = result; 
    const valid = error == null; 

    if (!valid) { 
        res.status(422).json({ 
          message: error.message, 
          data: newState 
        }) 
      } else{
        //Store on DB
        newState.save((err,state) =>{
            if(err){
                res.send(err);
            }else{
                res.status(201).json({message: "State successfully added!", state})
            }
            
        });
      }

}

/**
 * PUT /state/city/:state_name, add city to state state_name
 */
function addCity(req, res) {
    var city = req.body.city;
    state = req.params.state_name;
    
    let query = State.updateOne({name: state}, {$addToSet: {cities: city}})

    query.exec( (err, state) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }
        res.status(201).json({message:"City added successfully to state"});
    }) 
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

/**
 * DELETE /state/delete/:state_name delete state
 */
function deleteState(req, res) {
    var state_name = req.params.state_name;

    let query = State.deleteOne({ 'name': state_name })

    query.exec( (err, state) =>{
        //Check if no errors and send json back
        if(err){
            res.send(err);
        }else{
            res.status(200).json({message:"State removed successfully"});
        }
        
    })
}

module.exports = { getStatebyName, newStateHoliday, newState, getStates, deleteHoliday, addCity, deleteState };