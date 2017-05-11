module.exports = function(router, models, config){
    router.get('/', function(req, res){
        res.json({message: 'Router is working!'})
    })
    router.post('/jsontest', function(req, res){
        object = req.body;
        console.log(req.body);
        res.json({
            object: object
        });
    })

    //score calculator
    router.get('/score', function(req, res){
        var capturesPromise = models.Capture.findAll({
            include: [models.Team],
            order: [ ['time', 'ASC'] ]
        });
        var gamesPromise = models.Game.findAll({
            order: [ ['start','ASC'] ]
        });
        var teamsPromise = models.Team.findAll();

        Promise.all([gamesPromise,capturesPromise,teamsPromise]).then(results => {
            games = results[0];
            captures = results[1];
            teams = results[2];

            //aggregation targets
            var gameScores = {};
            var totalScores = {};
            teams.forEach(function(team){
                    totalScores[team.id] = {
                        score: 0,
                        teamName: team.name,
                    }
                }, this);
            var assignedCaptures = [];

            //swap vars for tracking last captures and other trickery
            var lastCapTime = null;
            var lastCapTeam = null;
            

            //start the capture index at 0
            var i = 0;
            //index addition to deal with adding "game start" captures
            var assignedIndexAdd = 0;
            games.forEach(function(game) {
                //set our initial game conditions, last cap at start of the game
                //also adds an assigned capture for the game start, set to persist captures
                gameScores[game.name] = {}
                teams.forEach(function(team){
                    gameScores[game.name][team.id] = {
                        score: 0,
                        teamName: team.name
                    }
                }, this);

                var lastCapTime = game.start;
                if (lastCapTeam != null){
                    assignedCaptures.splice((i+assignedIndexAdd),0,{
                        game: game.id,
                        time: game.start,
                        team: lastCapTeam,
                        duration: null,
                        type: "start"
                    });
                    assignedIndexAdd++;
                }
                //loop through all subsequent captures
                for(i = i ;i < captures.length;i++){
                    capture = captures[i];
                    //if the capture occurs before the game (and consequently after the last one)
                    //it must not fall into a game slot and is there for unassigned
                    //therefore we give it a game of null and put it into our array before our game start
                    if (capture.time <= game.start){
                        assignedCaptures.splice((i+assignedIndexAdd-1),0,{
                            game: null,
                            time: capture.time,
                            team: capture.Team.id,
                            teamname: capture.Team.name,
                            duration: null,
                            type: "undefinedcapure"
                        });
                        continue;
                    }
                    //if the capture occurs during a game, we assign it to the game and calculate
                    //if the last capture was held by a team we calculate the duration of the last capture
                    else if (capture.time >= game.start && capture.time <= game.end){
                        //console.log(`game: ${game.name} time: ${capture.time} team: ${capture.Team.name}`)
                        assignedCaptures.push({
                            game: game.id,
                            time: capture.time,
                            team: capture.Team.id,
                            teamname: capture.Team.name,
                            duration: null,
                            type: "capture"
                        });
                        if (lastCapTeam != null){
                            score = capture.time - lastCapTime;
                            assignedCaptures[(i+assignedIndexAdd-1)]["duration"] = score;
                            gameScores[game.name][capture.Team.id]["score"] = gameScores[game.name][capture.Team.id]["score"] + score;
                            totalScores[capture.Team.id]["score"] = totalScores[capture.Team.id]["score"] + score;
                        }
                        lastCapTime = capture.time;
                        lastCapTeam = capture.Team.id;
                        
                        continue;
                    }
                    else {
                        if (lastCapTeam != null){
                            score = capture.time - lastCapTime;
                            assignedCaptures[(i+assignedIndexAdd-1)]["duration"] = score;
                            gameScores[game.name][capture.Team.id]["score"] = gameScores[game.name][capture.Team.id]["score"] + score;
                            totalScores[capture.Team.id]["score"] = totalScores[capture.Team.id]["score"] + score;
                        }
                        //console.log("capture past game time, moving to next game");
                        break;
                    }
                }
                if (lastCapTeam != null && assignedCaptures[(i+assignedIndexAdd-1)]["duration"] == null){
                        score = capture.time - lastCapTime;
                        assignedCaptures[(i+assignedIndexAdd-1)]["duration"] = score;
                        gameScores[game.name][capture.Team.id]["score"] = gameScores[game.name][capture.Team.id]["score"]+ score;
                        totalScores[capture.Team.id]["score"] = totalScores[capture.Team.id]["score"] + score;
                    }
            },this);

            //flatten our objects for returning
            //total score flatten
            totals = []
            grandTotal = 0
            for (element in totalScores){
                grandTotal+=totalScores[element]["score"];
                totals.push(totalScores[element]);
            }
            //gamescores flatten
            gameTotals = [];
            for (element in gameScores){
                scores = [];
                gameGrandTotal = 0;
                for (score in gameScores[element]){
                    scores.push(gameScores[element][score]);
                    gameGrandTotal += gameScores[element][score]["score"];
                }
                gameTotals.push({
                    game: element,
                    total: gameGrandTotal,
                    scores: scores
                })
            }

            result = {
                        grandTotal: grandTotal,
                        totalScores: totals,
                        gameScores: gameTotals,
                        captures: assignedCaptures
                    };
            res.json(result);
        }).catch(function(err){console.log(err);});
    });

    //status
    router.get('/status', function(req, res){
        capturePromise = models.Capture.getCurrent().then(capture =>{
            if (capture.TeamId == null){
                res.jsoin({
                    team: null
                })
            }
            else{
                models.Team.findById(capture.TeamId).then(team => {
                    res.json({
                        team: team.name
                    });
                });
            }
        });
    });
    //capture endpoint for clients
    router.post('/capturetest', function(req, res){
        models.Capture.captureEvent(models,req.body.team,req.body.mac).then(function(){
            res.json({
                success: true
            })
        })
        .catch(function(err){
            throw err;
        })
    })
}