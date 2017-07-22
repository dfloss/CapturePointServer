'use strict';
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
        },
        simpleColor: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        webColor: {
            type: DataTypes.STRING,
            defaultValue: null
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
        }
    }
  });
  return Team;
}