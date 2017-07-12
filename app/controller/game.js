module.exports = function (events, models, config){
    var game = {
        start: (name,start,end = null,teamId = null) =>{
            if (name == null || start == null){
                var error = new Error("name and start must have non null values");
                error.code = "EINVALIDPARAM"
                throw error
            }
            conflicts = models.Game.getConflicts(starttime,endTime);
            if (conflicts == null){
                var game = {
                    name: name,
                    start: starttime,
                    end: end,
                    teamId: teamId 
                }
               return models.Game.create(game);
            }
            else{
                return new Promise(resolve => {
                    resolve({error:true,conflicts: conflicts});
                });
            }
        }
    }
    return game
}