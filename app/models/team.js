'use string';
module.exports = function(sequelize, DataTypes){
    var Team = sequelize.define('Team',{  
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    },{
    classMethods: {
        associate: function(models) {
        },
        findByName: function(teamName){
            return Team.findOne({
                where: {
                    name: teamName
                }
            });
        },
        //testing this as a way to validate update parameters 
        //since sequelize doesn't do that
        validate: function(teamparams){
            //loop through all properties passed to check validity
            for (var property in teamparams) {
                if (team.hasOwnProperty(property)) {
                    var value = teamparams[property]
                    //put propertynames with their associated checks here
                    //if there are no checks just put a blank case statement with a break
                    switch (property){
                    case "name":
                        //null and undefinied names are not allowed
                        if (value == null){throw "Team name is not allowed to be null";}
                        break;
                    case "active":
                        break;
                    default:
                        throw `invalid property name ${property}`;
                    }
                }
            }
        }
    }
  });
  return Team;
}