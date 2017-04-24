'use strict';
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
            type: DataTypes.DATE,
            allowNull: false,
        }
    },{
    classMethods: {
        associate: function(models) {
        },
        getCurrent: function(){
            return Game.findOne({
                where: {
                    start: {$lt: new Date()},
                    end: {$gt: new Date()}
                },
                order: [ ['start', 'DESC'] ]
            })
        }
    }
  });
  return Game;
}