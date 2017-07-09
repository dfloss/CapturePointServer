module.exports = function (events, models, config){
    var game = {
        start: (name,start,end,teamId) =>{
            conflicts = models.Game.getConflicts(starttime,endTime);
            if (conflicts == null){
                var game = {
                    name: name,
                    start: starttime,
                    end: end,
                    teamId: teamId 
                }
                models.Game.create(game);
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