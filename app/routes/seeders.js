module.exports = function(router, controller, config){
    router.route('/seeders')
        .get((req,res,next)=>{
            let seed = req.query.seed
            var seedPromise;
            switch (seed){
                case "defaultTeams":
                    seedPromise = controller.Seeders.defaultTeams();
                break;
                case "testGame1":
                    seedPromise = controller.Seeders.testGame1();
                break;
                default:
                    seedPromise = Promise.reject("invalid seeder");
            }
            seedPromise.then(()=>{
                res.json({
                    message: `seeder: ${seed} executed`,
                    success: true
                })
            }).catch((err)=>{
                next(err);
            });
        })
}