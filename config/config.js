const dotenv = require('dotenv');
dotenv.config();

NODE_ENV = PROD;
module.exports = {
    host: process.env.HOST,
    dbhost: process.env.DBHost,
    port: process.env.PORT
};