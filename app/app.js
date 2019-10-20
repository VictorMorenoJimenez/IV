const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const country = require("./routes/country");
const state = require("./routes/state");
const city = require("./routes/city");
const port = 8080;
const host = '0.0.0.0';
let config = require('config');
const dotenv = require('dotenv');
dotenv.config();
var dbhost;
var test_user=process.env.TESTUSER;
var test_password=process.env.TESTPASSWORD;
                               
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
if( process.env.NODE_ENV != 'test'){
  //production database
  dbhost = process.env.DBHost;
}else{
  //test database
  dbhost = `mongodb+srv://conan:runescape12@cluster0-1t7ay.mongodb.net/test?retryWrites=true&w=majority`;
}

dbhost = `mongodb+srv://conan:runescape12@freedaycluster-zxp2d.mongodb.net/test?retryWrites=true&w=majority`;

console.log(dbhost);
mongoose.connect(dbhost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.get("/", (req, res) => res.status(200).json(
    {
      "status": "OK",
      "example": {"route":"GET /country/Spain",
      "value": {

              "holidays": [
                  {
                      "_id": "5d9be3d16c384618bc4671e6",
                      "day": 12,
                      "month": 10,
                      "description": "Dia de la Constitucion"
                  }
              ]
          }
      }
    }
  )
);

//Country

//Get all countries
app.route("/country")
  .get(country.getCountries);

// POST routes to Country
app.route("/country/new")
  .put(country.newCountry);

  // get all countries
app.route("/country/:country_name")
  .get(country.getCountryHolidays);

// new holiday on country
app.route("/country/:country_name")
  .put(country.newCountryHoliday);

app.route("/country/:country_name")
    .delete(country.deleteHoliday);


//State
//Get all states
app.route("/state")
  .get(state.getStates);

app.route("/state/:state_name")
  .get(state.getStatebyName);

app.route("/state/new")
  .put(state.newState);

// new holiday on state
app.route("/state/:state_name")
  .put(state.newStateHoliday);

app.route("/state/:state_name")
  .delete(state.deleteHoliday);

//City
//Get all cities
app.route("/city")
  .get(city.getCities);

app.route("/city/:city_name")
  .get(city.getCityByName);

  // new holiday on state
app.route("/city/:city_name")
.put(city.newCityHoliday);

app.route("/city/new")
  .put(city.newCity);

app.route("/city/:city_name")
  .delete(city.deleteHoliday);

app.listen(port, host);
console.log(`Running on http://${host}:${port}`);

module.exports = app;