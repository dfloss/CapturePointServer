var gpio = require('../gpio/hardware.js');

module.exports = function(router, models, config){
    
    router.route("/gpio")
        .get(function(req, res){
            console.log('not sure what this is for yet');
        })
        .post(function(req, res){
            console.log('someone is capturing!');
			gpio.capture(10, 2);
        });
}