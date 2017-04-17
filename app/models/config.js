'use strict';
module.exports = function(sequelize, DataTypes){
    var Config = sequelize.define('Config',{  
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        data: DataTypes.JSONB
    },{
    classMethods: {
        associate: function(models) {
        }
    }
  });
  return Config;
}