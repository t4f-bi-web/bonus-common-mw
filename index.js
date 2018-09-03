const CommonMiddleware = require('./lib/commonMiddleware');
const { API,services } = require('./config/serives');
const EurekaClient = require('./lib/registerEureka');
const User = require('./lib/user');

module.exports = {
    CommonMiddleware,
    EurekaClient,
    User,
    API,
    services
}
