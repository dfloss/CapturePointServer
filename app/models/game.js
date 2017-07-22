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
        getConflicts: function(start, end = null, id = null){
            var conflictSearch = {};
            if (id != null){
                conflictSearch.id = {$not: id};
            }
            if (end == null){
                conflictSearch.end =  {$gt: start};
            }
            else{
                conflictSearch.start = {$lt: end};
                conflictSearch.$or = [
                    {end: {$gt: start}},
                    {end: null}
                ];
            }
            return Game.findAll({where: conflictSearch});
        },
        getNext: ()=>{
            var now = new Date();
            return Game.findOne({
                where: {
                    start: {$gt: now}
                },
                order: ['start']
            })
        }
    }
  });
  return Game;
}