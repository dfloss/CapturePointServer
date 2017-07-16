module.exports = function(models, config){
    const eventClass = require('events');
    class Events extends eventClass {}
    const events = new Events();
    var controller = {
        Game: require("./game.js")(events,models,config),
        Team: require("./team.js")(events,models,config),
        //capture: require("./capture.js")(events,models,config),
        events: events
    }
    return controller
}