module.exports = (router, controller, config) => {
    
    router.route("/games")
        .get(function(req, res, next){
            controller.Game.getAll().then(function(games){
                res.json(games);
            })
        })
        .post(function(req, res, next){
            gameparams = req.body;
            controller.Game.create(gameparams).then(()=>{
                res.json({
                    message: `Successfully added Game ${gameparams.name}`,
                    success: true
                })    
            }).catch(function(err){
                err.result = `Unable to add game ${gameparams.name}`;
                next(err);
            })
        });
     //specific game routes
     router.param('gameId', function(req, res, next){
         contoller.Game.get(req.params.gameId)
         .then(function(game){
             req.game = game;
             next();
         })
     })
     router.route("/games/:gameId")
         .get(function(req, res, next){
             res.json(req.game);
         })
         .patch(function(req, res, next){
             //req.game.update(req.body)
             game = req.body;
             game.id = req.game.id;
             controller.Game.update(game).then(()=>{
                 res.json({
                     message: "successfully updated game",
                     success: true
                 })
             });
         })
         .delete(function(req, res, next){
             req.team.destroy().then(function(){
                 res.json({
                     message: "successfully deleted game",
                     success: true
                 })
             })
         });
}