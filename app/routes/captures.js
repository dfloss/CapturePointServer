module.exports = function(router, models, config){
    
    router.route("/captures")
        .get(function(req, res){
            models.Capture.findAll().then(captures =>{
                res.json(captures);
            });
        })
        .post(function(req, res){
            models.Capture.captureEvent(models, req.body.teamName, req.body.gameId)
            .then(value => {
                res.json({
                    mesage: 'capture successful',
                    success: true
                });
            })
        })
    router.route("/captures/:captureId")
        .patch(function(req, res){
            models.Capture.findById()
        })
        .delete(function(req, res){
            
        })
        .put(function(req, res){
            
        });
}