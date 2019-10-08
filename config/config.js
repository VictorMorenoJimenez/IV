const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    host: process.env.HOST,
    dbhost: process.env.DBHost,
    port: process.env.PORT
};