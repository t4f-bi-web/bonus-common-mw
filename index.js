const CommonMiddleware = require('./lib/commonMiddleware');
const { API,services } = require('./config/serives');
const RegisterEureka = require('./lib/registerEureka')

module.exports = {
    CommonMiddleware,
    RegisterEureka,
    API,
    services
}