module.exports = function(router,controller,config){
    require('./capture')(router,controller,config);
    require('./init')(router,controller,config);
    require('./status')(router,controller,config);
    require('./activeteams')(router,controller,config);
}