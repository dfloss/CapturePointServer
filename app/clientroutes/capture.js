module.exports = function(router, controller, config){
    //route for client sending a successful capture
    router.post('/capture', (req, res, next)=>{
        controller.getDeviceId(req).then((deviceId)=>{
            controller.capture(req.body.TeamId,req.deviceId).then(()=>{
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
    //route for stopping capture attemps
      //will need some kind of validation but skipping it for proof of concept
    router.post('/stopcapturing',(req, res, next)=>{
        contoller.stopCapturing().then(()=>{
            res.json({
                success: true
            });
        })
        .catch((error)=>{
            next(error);
        });
    });
    //route for stopping capture attemps
      //will need some kind of validation but skipping it for proof of concept
    router.post('/continuecapturing',(req, res, next)=>{
        contoller.stopCapturing().then(()=>{
            res.json({
                success: true
            });
        })
        .catch((error)=>{
            next(error);
        });
    });
}