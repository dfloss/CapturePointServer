var sys = require('util');
var exec = require('child_process').exec;

module.exports = function(router, models, arp, config){
    
    router.post('/init', function(req, res){
        var time = req.body.time
        //console.log(req.body);
        console.log(`Init Called with: ${time}`);
        //this is how it should be done eventually
        //controller.setSystemTime(time);


        //TEST CODE HERE UNTIL CONTROLLER IS READY

        var cmd = "sudo date -s \'" + time + "\'";
        exec(cmd, function (error, stdout, stderr) {
          console.log(stdout + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
        });

    })
}