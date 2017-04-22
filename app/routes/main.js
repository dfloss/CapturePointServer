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
        models.Capture.findAll({
            include: [models.Game, models.Team],
            order: [ ['time', 'ASC'] ]
        })
        .then(results => {
            curTeam = results[0].Team.name;
            capTime = results[0].time;
            totalScore = {};
            for(i=1;i<results.length;i++){
                result = results[i];
                if (result.Team.name !== curTeam){
                    score = result.time - capTime;
                    totalScore[curTeam] = (totalScore[curTeam] || 0 ) + score
                    capTime = result.time;
                    curTeam = result.Team.name;
                }
            }
            res.json(totalScore);
        })
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
        models.Capture.captureEvent(models,req.body.team).then(function(){
            res.json({
                success: true
            })
        })
        .catch(function(err){
            throw err;
        })
    })
}