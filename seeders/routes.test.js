var axios = require("axios");
var http = axios.create({
    baseURL: 'http://127.0.0.1:8080/capturepointapi'
});

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

var gamePromise = http({
    method: "POST",
    url: "/games",
    data: game
})

//Setup two teams
teams = [
    {
        name: "team1",
        simpleColor: "Green",
        webColor: '4a5444'
    },
    {
        name: "team2",
        simpleColor: "Orange",
        webColor: 'b49d80'
    }
]

teamPromise = [
    http({
        url: "/teams",
        method: "POST",
        data: teams[0]
    }),
    http({
        url: "/teams",
        method: "POST",
        data: teams[1]
    })
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


capturePromises = [];
captures.forEach(function(capture) {
    capturePromises.push(
        http({
            method: "POST",
            url: "/captures",
            data: capture
        })
    )
}, this);

Promise.all([gamePromise,teamPromise]).then(()=>{
    console.log("Starting: capture");
    Promise.all(capturePromises).then(()=>{
        console.log("alldone!");
        process.exit();
    });
});

