const log4js = require('log4js');
log4js.configure({
  "appenders": {
    "logstash": {
      "type": "@log4js-node/logstashudp",
      "host": "logstash",
      "port": 5002
    }
  },
  "categories": {
    "default": {
      "appenders": [
        "logstash"
      ],
      "level": "info"
    }
  }
});
const logger = log4js.getLogger();

module.exports = logger;
