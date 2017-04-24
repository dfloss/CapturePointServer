//Seeder for testing a single day, 2 team game with 10 random captures

var models = require('../app/models');
var config = require('../config/config.json')

//Helper function for Javascript's shitty date object
var addMinutes = function(date, minutes){
    return new Date(date.getTime() + minutes*60000);
}
//Help Function for JAvascripts shitty random function
var getRand = function(min,max){
    return Math.random() * (max - min + 1) + min;
}

//Generate our times

//Set game time to 8:00 at the begining of the day
//Set game end to the end of the night.
var gametime = new Date();
var gameend = new Date();
gameend.setHours(23);
gametime.setHours(8);
gametime.setMinutes(0);
var game = {
    name: "game1",
    start: gametime,
    end: gameend
}

//Setup two teams
teams = [
    {
        name: "team1"
    },
    {
        name: "team2"
    }
]

//Generate 10 capture times, start at game start
captures = []
lastCapture = gametime;

for(i=0;i<10;i++){
    randMinutes = getRand(30,60);
    nextTeam = teams[i%2].name;
    captureTime = addMinutes(lastCapture,randMinutes);
    captures.push({
        time: captureTime,
        team: nextTeam
    });
    lastCapture=captureTime
}
//Run our shit


//reset DB, all seeders should do this
models.sequelize.sync({force: true}).then(function(){
    var gamePromise = models.Game.create(game);
    var teamPromises = [
        models.Team.create(teams[0]),
        models.Team.create(teams[1])
    ]
    Promise.all([gamePromise,teamPromises]).then(function(){
        var promises = []
        for (capture of captures){
            promises.push(models.Capture.captureEvent(models,capture.team,capture.time));
        }
        Promise.all(promises).then(function(){
            return;
        })
    });
});
