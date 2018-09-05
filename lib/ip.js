'use strict';

const os = require('os');
const ifaces = os.networkInterfaces();


const getFirstLocalIpv4Address = () => {
    let ips = [];
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }
            ips.push([ifname, iface.address]);
        });
    });

    //取第一个地址返回
    return ips.length ? ips[0][1] : "";
}

module.exports = {
    getFirstLocalIpv4Address
};