const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const country = require("./routes/country");
const state = require("./routes/state");
const city = require("./routes/city");
let config = require('config');

require('dotenv/config');                                   
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));


//Rutes
/*const countryRoutes = require('../routes/country');
const stateRoutes = require('../routes/state');
const cityRoutes = require('../routes/city');

app.use('/country', countryRoutes);
app.use('/state', stateRoutes);
app.use('/city', cityRoutes);*/

// Common options
let options = { 
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
}; 

//db connection      
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined')); 
}


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


app.get("/", (req, res) => res.json({message: "Welcome to our FreedayAPI!"}));

//Country

//Get all countries
app.route("/country")
  .get(country.getCountries);

app.route("/country/new")
  .post(country.newCountry);

//State
//Get all states
app.route("/state")
  .get(state.getStates);

app.route("/state/new")
  .post(state.newState);

//City
//Get all cities
app.route("/city")
  .get(city.getCities);

app.route("/city/new")
  .post(city.newCity);







app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);