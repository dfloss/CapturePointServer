module.exports = function (events, models, config){
    var Game = {
        create: (game) =>{
            if (game.name == null || game.start == null || game.name == ""){
                return new Promise((resolve,reject)=>{
                    var error = new Error("name and start must have non null values");
                    error.code = "EINVALIDPARAM"
                    reject(error);
                });
            }
            else if (game.start > game.end && game.end != null){
                return new Promise((resolve,reject)=>{
                    var error = new Error("game must end after it starts");
                    error.code = "EINVALIDPARAM"
                    reject(error);
                });
            }
            //return our initial promise becuase promise chains!
            return models.Game.getConflicts(game.start,game.end).then((conflicts) => {
                if (conflicts == null || conflicts.length == 0){
                    return models.Game.create(game);
                }
                else{
                    return new Promise((resolve,reject)=>{
                        var error = new Error("Game times conflict with other games");
                        error.code = "ECONFLICT";
                        error.conflicts = conflicts;
                        reject(error);
                    });
                }
            });
        },
        update: (game)=>{
            gameId = game.id;
            var result = delete game.id;

            return models.Game.getConflicts(game.start,game.end,gameId).then((conflicts)=>{              
                if (conflicts == null || conflicts.length == 0){
                    return models.Game.update(game,{where: {id: gameId}});
                }
                else{
                    return new Promise((resolve,reject)=>{
                        var error = new Error("Game times conflict with other games");
                        error.code = "ECONFLICT";
                        error.conflicts = conflicts;
                        reject(error);
                    });
                }
            });
        },
        delete: (game) =>{
            return models.Game.findById(game.id).then(gameRecord =>{
                return gameRecord.destroy();
            });
        },
        get: (id) =>{
            return models.Game.findById(id);
        },
        getAll: () =>{
            return models.Game.findAll();
        },
        getCurrent: () =>{
            return models.Game.getCurrent();
        }
    }
    return Game
}