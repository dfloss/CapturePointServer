//Seeder for testing a single day, 2 team game with 10 random captures
var models = require('../app/models');
var config = require('../config/config.json');
var controller = require('../app/controller');


//Helper function for Javascript's shitty date object
var addMinutes = function(date, minutes){
    return new Date(date.getTime() + minutes*60000);
}
//Help Function for Javascripts shitty random function
var getRand = function(min,max){
    return Math.random() * (max - min + 1) + min;
}
//mactable for seeding players
var macs = [
    "00-00-00-00-00-00",
    "11-11-11-11-11-11",
    "22-22-22-22-22-22",
    "33-33-33-33-33-33",
    "44-44-44-44-44-44",
    "55-55-55-55-55-55",
    "66-66-66-66-66-66",
    "77-77-77-77-77-77",
    "88-88-88-88-88-88",
    "99-99-99-99-99-99",
    "aa-aa-aa-aa-aa-aa",
    "bb-bb-bb-bb-bb-bb",
    "cc-cc-cc-cc-cc-cc",
    "dd-dd-dd-dd-dd-dd",
    "ee-ee-ee-ee-ee-ee",
    "ff-ff-ff-ff-ff-ff"
]

//Generate our times

//Set Game to start 4 hours previous to current
  //and end 4 hours after current time
gameStart = addMinutes((new Date()),-240);
gameEnd = addMinutes((new Date()),240);
game = {
    name: "currentGame",
    start: gameStart,
    end: gameEnd
}


//Setup teams
teams = [
    {
        name: "team1",
        simpleColor: 'Green',
        webColor: '00ff00',
        active: true
    },
    {
        name: "team2",
        simpleColor: 'Orange',
        webColor: 'd2b48c',
        active: true
    },
    {
        name: "team3",
        simpleColor: 'Red',
        webColor: 'ff0000',
        active: false
    },
    {
        name: "team4",
        simpleColor: 'Blue',
        webColor: '0000ff',
        active: false
    },
    {
        name: "team5",
        simpleColor: 'Yellow',
        webColor: 'ffff00',
        active: false
    },
    {
        name: "team6",
        simpleColor: 'Purple',
        webColor: '800080',
        active: false
    },
]

//Generate 10 capture times, start at game start
captures = [];
lastCapture = gameStart;

for(i=0;i<10;i++){
    randMinutes = getRand(30,60);
    macnum = Math.floor(getRand(0,15));
    mac = macs[macnum];
    nextTeam = (i%2)+1;
    captureTime = addMinutes(lastCapture,randMinutes);
    captures.push({
        time: captureTime,
        TeamId: nextTeam,
        deviceId: mac
    });
    lastCapture=captureTime;
}

//reset DB, all seeders should do this
models.sequelize.sync({force: true}).then(function(){
    var gamePromise = models.Game.create(game);
    var teamPromises = [
        models.Team.create(teams[0]),
        models.Team.create(teams[1])
    ]
    Promise.all([gamePromise,teamPromises]).then(function(){
        models.Capture.bulkCreate(captures).then(function(){
            console.log("alldone");
            process.exit();
        });
    });
});
