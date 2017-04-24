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
var gametime = new Date();
var gameend = new Date();
gameend.setHours(12);
gametime.setHours(8);
gametime.setMinutes(0);
//Set game time to 8:00 at the begining of the day
//Set game end to the end of the night.
var games = [{
        name: "game1",
        start: new Date().setHours(8,0,0,0),
        end: new Date().setHours(12,0,0,0)
    }]
games.push({
        name: "game2",
        start: new Date().setHours(13,0,0,0),
        end: new Date().setHours(17,0,0,0)
    });

//Setup two teams
teams = [
    {
        name: "team1"
    },
    {
        name: "team2"
    }
]

//Generate 20 capture times, start at game start
captures = []
gametime.setHours(8);
lastCapture = gametime;

for(i=0;i<20;i++){
    randMinutes = getRand(15,30);
    nextTeam = i%2 + 1;
    captureTime = addMinutes(lastCapture,randMinutes);
    captures.push({
        time: captureTime,
        TeamId: nextTeam
    });
    lastCapture=captureTime
}
//Run our shit


//reset DB, all seeders should do this
models.sequelize.sync({force: true}).then(function(){
    var gamePromise = models.Game.bulkCreate(games);
    var teamPromises = [
        models.Team.create(teams[0]),
        models.Team.create(teams[1])
    ]
    Promise.all([gamePromise,teamPromises]).then(function(){
        models.Capture.bulkCreate(captures).then(function(){
            console.log("alldone");
        });
    });
});
