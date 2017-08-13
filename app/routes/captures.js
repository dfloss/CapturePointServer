module.exports = function(router, models, config){
    
    router.route("/captures")
        .get(function(req, res){
            models.Capture.findAll().then(captures =>{
                res.json(captures);
            });
        })
        .post(function(req, res){
            models.Capture.create(req.body)
            .then(value => {
                res.json({
                    mesage: 'capture successfully created',
                    success: true
                });
            })
            .catch(err =>{
                next(err);
            });
        });
        //Specific Captures
    router.param("captureId",function(res,req,next){
        models.Capture.findById(req.params.captureId).then(capture => {
            req.capture = capture;
            next();
        })
    });
    router.route("/captures/:captureId")
        .patch(function(req, res){
            
        })
        .delete(function(req, res){
            req.capture.delete().then(function(){
                res.json({
                    message: "capture deleted",
                    success: true
                })
            })
        })
        .put(function(req, res){
            
        });
}