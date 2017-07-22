module.exports = function(router, controller, config){
    router.get("/status",(req,res,next)=>{
        controller.getStatus().then((status)=>{
            res.json(status);
        }).catch((error)=>{
            next(error);
        });
    });
}