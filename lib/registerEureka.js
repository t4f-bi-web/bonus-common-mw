

const Eureka = require('eureka-js-client').Eureka;
const Client_c = require("cloud-config-client");
const Resilient = require('resilient');
const { getFirstLocalIpv4Address } = require('./ip');

let client = {};

const registrEureka = (name, port) => {
    let localIpv4Ip = getFirstLocalIpv4Address();
    return Client_c.load({
        endpoint: process.env.REG_SERVER,
        name,
        profiles: process.env.REG_ENV
    }).then((config) => {
        let clientObj = new Eureka({
            instance: {
                instanceId: `${localIpv4Ip}:${name}:${port}`,
                app: name,
                hostName: localIpv4Ip,
                ipAddr: localIpv4Ip,
                port: {
                    '$': port,
                    '@enabled': true,
                },
                homePageUrl: `http://${localIpv4Ip}:${port}`,
                vipAddress: name,
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
        client = Object.assign(client, {
            __client: clientObj,
            getServerByAppName: function (appName) {
                const cl = Resilient();
                let instances = this.__client.getInstancesByAppId(appName);
                const servers = instances.map(item => item.homePageUrl);
                cl.setServers(servers);
                return cl;
            }
        });
    });
}


module.exports = {
    registrEureka,
    client
}
