module.exports = function (events, models, config){
    //this function will either add a number to a property of an object
    //or if create the property if it doesn't exist
    function addsert(object,property,value){
        if (object[property]){
            object[property] += value;
        }
        else {
            object[property] = value;
        }
    }
    //custom query that returns all captures,game starts, and game ends.
    function getCaptureEvents(){
        var query = `
            SELECT "id","time","TeamId",'capture' as "type" FROM "Captures"
            UNION
            SELECT "id","start" as "time","TeamId",'start' as "type" FROM "Games"
            UNION 
            SELECT "id","end" as "time", NULL as "TeamId", 'end' as "type" FROM "Games"
            Order By "time"
            `;
        return models.sequelize.query(query,{type: models.sequelize.QueryTypes.SELECT})
    }
    //this returns a calculator function initialized with a specific team and time
    //the calculator function calculates a teams points for a specific capture using
    //the last capture time and the current capture time, it returns null if no points are scored
    //this occurs if the there was no previous owner or no game was occuring
    function createScoreCalculator(initTeam,initTime){
        var oldTeam = initTeam;
        var oldTime = initTime;
        return (team,time,game) => {
            let score
            let returnObject
            if (oldTeam == null || game == null){returnObject = null}
            else{
                score = time - oldTime;
                returnObject = {
                    score: score,
                    team: oldTeam,
                    start: oldTime,
                    end: time,
                    game: game
                }
            }          
            oldTeam = team;
            oldTime = time;
            return returnObject
        }
    }
    var getScore = async () =>{
        var events = await getCaptureEvents();
        var captureTable = [];
        var gameScores = {};
        var grandTotal = {};
        var scoreCalculator;
        var currentGame = null;
        events.map((event,index)=>{
            let team = event.TeamId;
            let time = event.time;
            let captureScore;
            //set currentGame and add aggregation target
            if (event.type == "start"){
                currentGame = event.id;
                gameScores[currentGame] = {};
            }

            //setup score calculator on first run
            //calculate score on subsequent runs
            if (index == 0){scoreCalculator = createScoreCalculator(team,time)}
            else{
                captureScore = scoreCalculator(team,time,currentGame);
            }

            //If there is a valid capture has occured (a team held a point then lost it/game ended)
            //add to capture table, game aggregation, and grand total
            if (captureScore){
                captureTable.push(captureScore);
                addsert(gameScores[currentGame],captureScore.team,captureScore.score);
                addsert(grandTotal,captureScore.team,captureScore.score);
            }
            
            //
            if (event.type == "end"){
                currentGame = null;
            }
        });
        return {
            captureTable: captureTable,
            gameScores: gameScores,
            grandTotal: grandTotal
        }
    }
    return {
        getScore: getScore,
        getCaptureEvents: getCaptureEvents
    }
}