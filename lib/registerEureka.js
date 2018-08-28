

const Eureka = require('eureka-js-client').Eureka;
const Client_c = require("cloud-config-client");

let client = {}; 

const registrEureka = (name,port) => {
    Client_c.load({
        endpoint: 'http://172.20.110.42:8888',
        name,
        profiles: 'dev'
    }).then((config) => {
        let clientObj = new Eureka({
            instance: {
                app: name,
                hostName: 'localhost',
                ipAddr: '127.0.0.1',
                port: {
                    '$': port,
                    '@enabled': true,
                },
                vipAddress: 'nobody.care.com',
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn',
                },
            },
            eureka: {
                // eureka server host / port
                host: config.properties['eureka.client.service-url.defaultZone'].split('/')[2].split(":")[0],
                port: config.properties['eureka.client.service-url.defaultZone'].split('/')[2].split(":")[1],
                preferIpAddress: true,
                servicePath: '/eureka/apps/',
            }
        });
        clientObj.start();
        client = Object.assign(clientObj,client);
    });
}


module.exports =  {
    registrEureka,
    client
}