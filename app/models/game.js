'use strict';
var sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes){
    var Game = sequelize.define('Game',{  
        name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        start: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        end: {
            type: DataTypes.DATE
        },
        persistTeam:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
    classMethods: {
        associate: function(models) {
            Game.belongsTo(models.Team);
        },
        getCurrent: function(){
            var now = new Date();
            return Game.findOne({
                where: {
                    start: {$lt: now},
                    end: {$gt: now}
                },
                order: [ ['start', 'DESC'] ]
            })
        },
        getConflicts: function(start, end){
            if (end == null){
                var conflictSearch = {
                    end: {$gt: start}
                }
            }
            else{
                var conflictSearch = {
                    start: {$lt: end},
                    $or: [
                        {end: {$gt: start}},
                        {end: null}
                    ]
                }
            }
            return Game.findAll({where: conflictSearch});
        }
    }
  });
  return Game;
}