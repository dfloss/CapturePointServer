module.exports = function(router, controller, config){
    //Route for returning only the active teams for clients
    router.get('/activeteams',(req,res,next)=>{
        returnPromise = controller.Team.getActive();
        returnPromise.then((teams)=>{
            res.json(teams);
        }).catch((err)=>{
            next(err);
        })
    });
}