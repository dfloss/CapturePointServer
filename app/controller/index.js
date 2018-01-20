module.exports = function(models, config){
    var arp = require('node-arp');
    const {promisify} = require("util");
    var getMacPromise = promisify(arp.getMAC);
    var crypto = require('crypto');
    var idHasher = crypto.createHash('sha1');
    const eventClass = require('events');
    class Events extends eventClass {}
    const events = new Events();
    var controller = {
        //model controllers
        events: events,
        Game: require("./game.js")(events,models,config),
        Team: require("./team.js")(events,models,config),
        Seeders: require('./seeders.js')(events,models,config),
        //Capture: require("./capture.js")(events,models,config),
        //controller variables
        timeSet: config.timeSet,
        isCapturing: false,
        capturingTeam: null,
        capturingTimer: null,
        //controller functions
    }
    controller.Game = require("./game.js")(controller.events,models,config);
    controller.Team = require("./team.js")(controller.events,models,config);
    controller.Capture = require("./capture.js")(controller.events,models,config);
    controller.getStatus = function(){      
        currentCaptureProm = controller.Capture.getCurrent();
        currentGameProm = controller.Game.getCurrent();
        return Promise.all([currentCaptureProm,currentGameProm]).then((values)=>{
            currentCapture = values[0];
            currentGame = values[1];
            var status;
            //if a game isn't happening return a message that there is no game
            if (currentGame == null){
                return models.Game.getNext().then((nextGame)=>{
                    return {
                        message: "No games occuring", //whatever we want if there is no game
                        currentCapture: {
                            time: null
                        },
                        currentGame: {
                            name: null,
                            start: null,
                            end: null
                        },
                        controllingTeam: {
                            name: null,
                            simpleColor: null,
                            webColor: null,
                            active: false
                        },
                        nextGame: nextGame,
                        date: new Date()
                    }
                });
            }
            //if there is a currentGame but no capture or a capture before the game started
            // return the currentGame's settings as the latest capture
            else if(currentCapture == null || currentCapture.time < currentGame.start){
                status = {
                    message: `Game: ${currentGame.name}`,
                    currentCapture: {
                        time: currentGame.start,
                        teamId: currentGame.teamId
                    },
                    controllingTeam: currentGame.Team,
                    currentGame: currentGame,
                    date: new Date()
                }
            }
            //all other circumstances should result in directly returning game and capture
            else{
                status = {
                    message: `Game: ${currentGame.name}`,
                    currentCapture: currentCapture,
                    currentGame: currentGame,
                    controllingTeam: currentCapture.Team,
                    date: new Date()
                }
            }
            status.isCapturing = controller.isCapturing;
            status.capturingTeam = controller.capturingTeam;
            return status;
        });
    }
    controller.getDeviceId = function(req){
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        ip = ip.substring(7,20);
        return getMacPromise(ip).then((mac)=>{
            if (err) {
                console.log(err);
                return Promise.resolve(null);
            }
            idHasher.update(mac);
            id = sha1hash.digest('base64');
            return Promise.resolve(id);
        }).catch((error)=>{
            console.log(error);
            return Promise.resolve(null);
        });
    }
    //capturing block... maybe make it it's own controller or put it in Capture
    controller.startCapturing = function(teamId){
        return controller.Team.get(teamId).then((team)=>{
            controller.isCapturing = true;
            controller.capturingTeam = team;
            controller.events.emit("capturing",team);
            controller.capturingTimer = setTimeout(controller.stopCapturing,config.capturingTimeout);
        }).catch((error)=>{
            var error = new Error(`invalid team id ${teamId}`);
            error.code = "ENOTFOUND";
            return Promise.reject(error);
        });
    }
    controller.stopCapturing = function(){
        controller.isCapturing = false;
        controller.capturingTeam = null;
        clearTimeout(controller.capturingTimeout);
        controller.events.emit("endCapturing");
    },
    controller.continueCapturing = function(){
        clearTimeout(controller.capturingTimeout);
        controller.capturingTimer = setTimeout(controller.stopCapturing,config.capturingTimeout);
    }
    controller.capture =  function(TeamId,deviceId){
            return controller.Team.get(TeamId).then((team)=>{
                capture = {
                    time: new Date(),
                    deviceId: deviceId,
                    TeamId: team.id
                }
                return controller.Capture.create(capture).then(()=>{
                    controller.stopCapturing();
                    controller.events.emit("capture",{team: team,deviceId: deviceId});
                });
            }).catch((error)=>{
                var error = new Error(`invalid team id ${teamId}`);
                erorr.code = "ENOTFOUND";
                return Promise.reject(error);
            });
    }
    return controller;
}
