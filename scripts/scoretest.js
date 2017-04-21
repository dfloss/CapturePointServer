var models = require('../app/models');
var config = require('../config/config.json')

models.Capture.findAll({
    include: [models.Game, models.Team],
    order: [ ['time', 'ASC'] ]
})
.then(results => {
    curTeam = results[0].Team.name;
    capTime = results[0].time;
    score = {};
    for(i=1;i<results.length;i++){
        result = results[i];
        if (result.Team.name !== curTeam){
            score = result.time - capTime;
            mscore = Math.floor(score / 1000 / 60);
            console.log(score);
            console.log(`Team: ${curTeam} scored ${mscore} minutes`);
            capTime = result.time;
            curTeam = result.Team.name;
        }
    }
})
 