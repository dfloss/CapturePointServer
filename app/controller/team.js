module.exports = function (events, models, config){
    var Team = {
        validate: (team)=>{
            var simpleColorSet = ["Red","Yellow","Blue","Orange","Purple","Green"]
            var webColorFilter = '^[0-9A-F]{6}$'
            if (team.webColor){
                if(!(team.webColor.match(webColorFilter))){
                    var error = new Error(`Invalid Parameter for webColor ${team.webColor}`);
                    error.code = "EINVALIDPARAM";
                    error.param = "webColor"
                    return error;
                }
            }
            if (team.simpleColor){
                if(simpleColorSet.indexOf(team.simpleColor) == -1){
                    var error = new Error(`Invalid Parameter for simpleColor ${team.simpleColor}`);
                    error.code = "EINVALIDPARAM";
                    error.param = "simpleColor";
                    return error;
                }
            }
            return true;
        },
        update: (team)=>{
            //contains true if team params are valid and an error if they are not
            var validation = Team.validate(team);
            if (validation != true){
                //if params are not valid reject with the returned errors
                return Promise.reject(validation);
            }
            teamId = team.id;
            delete team.id;
            return models.Team.update(team,{where: {id: teamId}});
        },
        get: (id)=>{
            return models.Team.findById(id);
        }
    }
    return Team;
}