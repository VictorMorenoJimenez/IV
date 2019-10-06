const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//Rutes
const countryRoutes = require('../routes/country');
const stateRoutes = require('../routes/state');
const cityRoutes = require('../routes/city');

app.use('/country', countryRoutes);
app.use('/state', stateRoutes);
app.use('/city', cityRoutes);



// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);