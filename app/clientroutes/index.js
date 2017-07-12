module.exports = function(router, models, arp, config){
    require('./capture')(router, models, arp, config);
    require('./init')(router,models,arp,config);
}