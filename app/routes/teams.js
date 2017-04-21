module.exports = function(router, models, config){
 
 //Router for teams collection 
    router.route("/teams")
        .get(function(req, res, next){
            models.Team.findAll().then(function(teams){
                res.json(teams);
            })
        })
        .post(function(req, res, next){
            teamparams = req.body;
            models.Team.create(teamparams).then(function(){
                res.json({
                    message: `Successfully added team ${teamparams.name}`,
                    success: true
                })    
            }).catch(function(err){
                err.message = `Unable to add team ${teamparams.name}`;
                err.statuscode = 400;
                next(err);
            })
        });
/*        .patch(function(req, res){
        })
        .delete(function(req, res){
            
        })
        .put(function(req, res){
            res.json({
                message: `Method does not exist`,
                error: "invalid method",
                success: false
            });
        });*/
  //Team Param
    router.param('team',function(req, res, next){
        models.Team.findByName(req.params.team).then(function(team){
            req.team = team;
            if (team == null){throw {message: `Unable to find team ${req.params.team}`}};
            next();
        })
        .catch(function(err){
            err.statuscode = 404;
            next(err);
        })
    })
  //Router for individual teams
    router.route("/teams/:team")
        .get(function(req, res, next){
            res.json(req.team);
        })
//        .post(function(req, res){})
        .patch(function(req, res, next){
            teamparam = req.body;
/*            try{
                models.Team.validate(teamparam);
            }
            catch(err){
                err.message = `Unable to update team data`,
                err.statuscode = 400
                next(err);
            }*/
            req.team.update(teamparam).then(function(){
                res.json({
                    message: "successfully updated team",
                    success: true
                })
            })
        })
        .delete(function(req, res, next){
            req.team.destroy().then(function(){
                res.json({
                    message: "successfully deleted team",
                    success: true
                })
            })
        });
//        .put(function(req, res){})
}
