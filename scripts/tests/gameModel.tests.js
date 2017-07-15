var models = require("../../app/models");
var time = new Date();
time = time.setMonth(1);
models.Game.getConflicts(time,null).then(value =>{
    if (value == null){
        console.log("weow");
    }
    else{
        value.forEach(function(element) {
            console.log(element.dataValues);
        }, this);
    }
});