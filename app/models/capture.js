'use string';
module.exports = function(sequelize, DataTypes){
    var Capture = sequelize.define('Capture',{
        time: {
            type: DataTypes.DATE,
            DefaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
    classMethods: {
        associate: function(models) {
            Capture.belongsTo(models.Team);
            Capture.belongsTo(models.Game);
        },
        //TODO: convert game to gameId
        captureEvent: function(models,teamName, game) {
            //get the current game if one is not passed
            var currentGame = game || models.Game.getCurrent();
            //look up the team if the teamName is not null
            var team = models.Team.findByName(teamName);
            //wait for team and game promises to return,
            // then return the created capture promise
            return Promise.all([currentGame,team]).then(values => {
                console.log(team);
                var params = {
                    time: new Date(),
                    GameId: values[0]['id'],
                    TeamId: values[1]['id']
                }
                Capture.create(params);
            })
        },
        validate: function(captureParams){
            //loop through all properties passed to check validity
            for (var property in captureParams) {
                if (captureParams.hasOwnProperty(property)) {
                    var value = captureParams[property]
                    //put propertynames with their associated checks here
                    //if there are no checks just put a blank case statement with a break
                    switch (property){
                    case "team":
                        break;
                    case "game":
                        break;
                    default:
                        throw `invalid property name ${property}`;
                    }
                }
            }
        }
    }
  });
  return Capture;
}