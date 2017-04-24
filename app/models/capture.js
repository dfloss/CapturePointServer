'use strict';
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
        },
        //TODO: remove game specification from this function
            //All game settings should be done by time
        captureEvent: function(models,teamName,time) {
            //set time if time is not provided
            var time = time || new Date();
            //return the promise to look up the team if the teamName is not null
           return models.Team.findByName(teamName).then(value => {
                var params = {
                    time: time,
                    TeamId: value['id']
                }
                Capture.create(params);
            });
        },
        getCurrent: function(){
            return Capture.findOne({
                where: {
                    time: {$lt: new Date()}
                },
                order: [ ['time', 'DESC'] ]
            })
        },
        validate: function(captureParams){
            //loop through all properties passed to check validity
            for (var property in captureParams) {
                if (captureParams.hasOwnProperty(property)) {
                    var value = captureParams[property];
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