var axios = require("axios");
var http = axios.create({
    baseURL: 'http://127.0.0.1:8080/capturepointapi'
});

//Setup two teams
teams = [
    {
        name: "team1",
        simpleColor: "Green",
        webColor: '4a5444'
    },
    {
        name: "team2",
        simpleColor: "Red",
        webColor: 'b49d80'
    },
    {
        name: "team3",
        simpleColor: "Red",
        webColor: 'ff0000'
    },
    {
        name: "team4",
        simpleColor: "Blue",
        webColor: '0000ff'
    },
    {
        name: "team5",
        simpleColor: "Yellow",
        webColor: 'ffff00'
    },
    {
        name: "team6",
        simpleColor: "Purple",
        webColor: '800080'
    }
]

var teamPromise = teams.map((team)=>{
    return http({
	    url: "/teams",
	    method: "POST",
	    data: team
    });
});

Promise.all([teamPromise]).then(()=>{
    console.log(teamPromise);
    //process.exit();
});

