module.exports = function(router, controller, config){
    //route for client sending a successful capture
    router.post('/capture', (req, res, next)=>{
        controller.getDeviceId(req).then((deviceId)=>{
            controller.capture(req.body.TeamId,deviceId).then(()=>{
                res.json({
                    success: true
                })
            })
            .catch((error)=>{
                next(error);
            });
        });
    });
    //route for capture attempt starting
      //will need some kind of validation but skipping it for proof of concept
    router.post('/startcapturing',(req, res, next)=>{
        controller.startCapturing(req.body.teamId).then(()=>{
            res.json({
                success: true
            });
        })
        .catch((error)=>{
            next(error);
        });
    });
    //route for stopping capture attempts
      //will need some kind of validation but skipping it for proof of concept
    router.post('/stopcapturing',(req, res, next)=>{
        controller.stopCapturing().then(()=>{
            res.json({
                success: true
            });
        })
        .catch((error)=>{
            next(error);
        });
    });
    //route for continuing capture attempts
      //will need some kind of validation but skipping it for proof of concept
    router.post('/continuecapturing',(req, res, next)=>{
        contoller.continueCapturing().then(()=>{
            res.json({
                success: true
            });
        })
        .catch((error)=>{
            next(error);
        });
    });
}