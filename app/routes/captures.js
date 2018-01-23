module.exports = function(router, controller, models, config){
    
    router.route("/captures")
        .get(function(req, res, next){
            if (req.query.view == "team"){
                controller.Capture.getAllTeam().then((captures)=>{
                    res.json(captures);
                })
            }
            else{
                models.Capture.findAll().then(captures =>{
                    res.json(captures);
                });
            }
        })
        .post(function(req, res, next){
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
        .delete(function(req, res, next){
            req.capture.delete().then(function(){
                res.json({
                    message: "capture deleted",
                    success: true
                })
            })
        })
        .put(function(req, res, next){
            
        });
}