module.exports = function(router, models, config){
    require('./main')(router, models, config);
    require('./captures')(router, models, config);
    require('./configs')(router, models, config);
    require('./games')(router, models, config);
    require('./teams')(router, models, config);
	require('./gpios')(router, models, config);
}