var config = {};
var models = require('./app/models');
var controller= require('./app/controller')(models,config);
console.log(controller.Seeders);
