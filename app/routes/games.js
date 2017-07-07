module.exports = (router, models, config) => {
    
    router.route("/games")
        .get(function(req, res, next){
            models.Game.findAll().then(function(games){
                res.json(games);
            })
        })
        .post(function(req, res, next){
            gameparams = req.body;
            models.Game.create(gameparams).then(function(){
                res.json({
                    message: `Successfully added Game ${gameparams.name}`,
                    success: true
                })    
            }).catch(function(err){
                err.message = `Unable to add team ${gameparams.name}`;
                err.statuscode = 400;
                next(err);
            })
        });
 /*       .patch(function(req, res){
            
        })
        .delete(function(req, res){
            
        })
        .put(function(req, res){
            
        });*/
     //current game route
     router.route("/games/current")
         .get(function(req, res, next){
             models.Game.getCurrent().then(function(game){
                 res.json(game); 
             });
         })
     //specific game routes
     router.param('gameId', function(req, res, next){
         models.Game.findById(req.params.gameId)
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
             req.game.update(req.body).then(function(){
                 res.json({
                     message: "successfully updated game",
                     success: true
                 })
             })
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