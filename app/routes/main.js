module.exports = function(router, models, config){
    router.get('/', function(req, res){
        res.json({message: 'Router is working!'})
    })
    router.post('/jsontest', function(req, res){
        object = req.body;
        console.log(req.body);
        res.json({
            object: object
        });
    })

    //score calculator
    router.get('/score', function(req, res){

    });
    //status
    router.get('/status', function(req, res){
        capturePromise = models.Capture.getCurrent().then(capture =>{
            models.Team.findById(capture.TeamId).then(team => {
                res.json({
                    team: team.name
                });
            });
        });
    });
    //capture endpoint for clients
    router.post('/capture', function(req, res){
        models.Capture.captureEvent(models,req.team).then(function(){
            res.json({
                success: true
            })
        })
    })
}