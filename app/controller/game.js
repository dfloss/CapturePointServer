module.exports = function (events, models, config){
    var game = {
<<<<<<< HEAD
        create: (name,start,end,teamId) =>{
=======
        start: (name,start,end = null,teamId = null) =>{
            if (name == null || start == null){
                var error = new Error("name and start must have non null values");
                error.code = "EINVALIDPARAM"
                throw error
            }
>>>>>>> 330a7fb6a20b0c011404ec525fe7c70d3da00abc
            conflicts = models.Game.getConflicts(starttime,endTime);
            if (conflicts == null){
                var game = {
                    name: name,
                    start: starttime,
                    end: end,
                    teamId: teamId 
                }
<<<<<<< HEAD
                return models.Game.create(game);
=======
               return models.Game.create(game);
>>>>>>> 330a7fb6a20b0c011404ec525fe7c70d3da00abc
            }
            else{
                return new Promise(resolve => {
                    resolve({error:true,conflicts: conflicts});
                });
            }
        },
        update: (game)=>{
            gameId = game.id;
            var result = delete game.id;
            return models.Game.update({game},{where: {id: gameId}});
        },
        delete: (game) =>{
            return models.Game.findById(game.id).then(gameRecord =>{
                return gameRecord.destroy();
            });
        },
        get: (filter) =>{
            if (filter == null){
                return models.Game.findAll();
            }
            else{
                return models.Game.findAll(filter);
            }
        },
        getById: (id) =>{
            return models.Game.findById(id);
        }
    }
    return game
}