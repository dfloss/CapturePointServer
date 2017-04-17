module.exports = function(router, models, config){
    
    router.route("/configs")
        .get(function(req, res, next){
            models.Config.findAll().then(function(configs){
                res.json(configs);
            })
        })
        .post(function(req, res, next){
            models.Config.create(req.body).then(function(){
                res.json({
                    message: "config successfully updated",
                    success: true
                });
            }).catch(function(err){
                err.message = `Unable to add config`;
                err.statuscode = 400;
                next(err);
            })
        });
    router.param("config",function(req, res, next){
        models.Config.findOne({where: {name: req.params.config} }).then(function(config){
                    req.config = config;
                    if (config == null){throw {message: `Unable to find config ${req.params.config}`}};
                    next();
                })
                .catch(function(err){
                    err.statuscode = 404;
                    next(err);
                })
    })    
    router.route("/configs/:config")
        .get(function(req, res, next){
            res.json(req.config);
        })
        .patch(function(req, res, next){
            req.config.update(req.body).then(function(){
                res.json({
                    message: "successfully updated config",
                    success: true
                });
            });
        })
        .delete(function(req, res, next){
            req.config.destroy().then(function(){
                res.json({
                    message: "successfully deleted config",
                    success: true
                });
            });
        })
        .put(function(req, res, next){
            
        });
}