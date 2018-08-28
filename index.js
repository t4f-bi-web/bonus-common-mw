const CommonMiddleware = require('./lib/commonMiddleware');
const { API,services } = require('./config/serives');
const EurekaClient = require('./lib/registerEureka')

module.exports = {
    CommonMiddleware,
    EurekaClient,
    API,
    services
}