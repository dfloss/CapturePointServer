module.exports = function(router, models, arp, config){
    require('./capture')(router, models, arp, config);
}