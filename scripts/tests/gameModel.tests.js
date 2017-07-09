var models = require("../../app/models");
var time = new Date();
time = time.setMonth(1);
models.Game.getConflicts(time).then(value =>{
    if (value == null){
        console.log("weow");
    }
    else{
        console.log(value[0].dataValues);
    }
});