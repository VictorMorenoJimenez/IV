const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const country = require("./routes/country");
const state = require("./routes/state");
const city = require("./routes/city");
const port = process.env.PORT || 8080;
const host = '0.0.0.0';
let dbhost = "mongodb://mongo:27017"
process.title = "FreeDay";
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// To handle HTTP POST request in Express.
// Body-parser extract the entire body portion of an incoming request and exposes it on req.body            
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

// Common options
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  useUnifiedTopology: true,
  family: 4 // Use IPv4, skip trying IPv6
};


//db connection      
if( process.env.NODE_ENV != 'TEST_CI'){
  //test database
  dbhost = "mongodb://mongodb:27017";
}else if(process.env.NODE_ENV == 'DOCKER'){
  dbhost = "mongodb://mongo:27017";
}else{
  dbhost = "mongodb+srv://conan:runescape12@cluster0-1t7ay.mongodb.net/test?retryWrites=true&w=majority"
}


dbhost = "mongodb+srv://conan:runescape12@cluster0-1t7ay.mongodb.net/test?retryWrites=true&w=majority"


// DB Connection
mongoose.connect(dbhost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.route("/status")
  .get(country.getStatus);


//Country

app.route("/country")
  .get(country.getCountries);

app.route("/country/new")
  .put(country.newCountry);

app.route("/country/state/:country_name")
  .put(country.addState);

app.route("/country/:country_name")
  .put(country.newCountryHoliday)
  .delete(country.deleteHoliday);


app.route("/country/:country_name")
    .get(country.getCountryHolidays)


app.route("/country/delete/:country_name")
    .delete(country.deleteCountry)
  

//State
app.route("/state")
  .get(state.getStates);

app.route("/state/new")
  .put(state.newState);

app.route("/state/city/:state_name")
  .put(state.addCity);

app.route("/state/:state_name")
  .get(state.getStatebyName)
  .put(state.newStateHoliday)
  .delete(state.deleteHoliday);

app.route("/state/delete/:state_name")
  .delete(state.deleteState)

//City
app.route("/city")
  .get(city.getCities);

app.route("/city/new")
  .put(city.newCity);

app.route("/city/:city_name")
  .get(city.getCityByName)
  .put(city.newCityHoliday)
  .delete(city.deleteHoliday);

app.route("/city/delete/:city_name")
  .delete(city.deleteCity)

  
app.listen(port, host);
console.log(`Running on http://${host}:${port}`);

module.exports = app;
