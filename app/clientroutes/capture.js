module.exports = function(router, models, arp, config){
    
    router.post('/capture', function(req, res){
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
            ip = ip.substring(7,20);
            arp.getMAC(ip, function(err, mac) {
                if (err) {
                    mac=null;
                }
                models.Capture.captureEvent(models,req.body.team,null,mac).then(function(){
                    res.json({
                        success: true
                    })
                })
                .catch(function(err){
                    throw err;
                })
                console.log(mac);
            });
    })
}