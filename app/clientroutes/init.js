module.exports = function(router, models, arp, config){
    
    router.post('/init', function(req, res){
        var time = req.body.time
        console.log(req.body);
        console.log(`Init Called with: ${time}`);
        //this is how it should be done eventually
        //controller.setSystemTime(time);


        //TEST CODE HERE UNTIL CONTROLLER IS READY
    })
}