module.exports = function(router, models, config, controller){
    require('./main')(router, models, config, controller);
    require('./captures')(router, models, config);
    require('./configs')(router, models, config);
    require('./games')(router, controller, config);
    require('./teams')(router, models, config, controller);
    require('./seeders')(router,controller,config);
    //require('./gpios')(router, models, config);
}
