module.exports = function (events, models, config){
    function scoreCalculator(initTeam,initTime){
        var oldTeam = initTeam;
        var oldTime = initTime;
        return (team,time) => {
            var score = time - oldTime;
            var returnObject = {
                score: score,
                team: oldTeam
            }
            oldTeam = team
            return returnObject;
        }
    }
}