var env = "development"
var models = require('./app/models');
var config = require('./config/config.json')[env];
var controller= require('./app/controller')(models,config);

controller.Score.getScore().then((score)=>{
    console.log(score);
});