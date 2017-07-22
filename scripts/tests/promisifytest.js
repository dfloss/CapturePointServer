const {promisify} = require("util");
const arp = require("node-arp");

getMacPromise = promisify(arp.getMAC);
getMacPromise('192.168.1.1').then((mac)=>{
    console.log(`mac: ${mac}`);
})
.catch((error)=>{
    console.log(`error: ${error}`)
});