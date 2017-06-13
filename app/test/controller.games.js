var expect    = require("chai").expect;
var games = require("../app/controller/games.js");
var config = require("../config/config.json");

describe("Game creation",function(){
    it("Can create a game with a start and an end that ends after it starts",function(){
    });
    it("Can create an open ended game that starts after the current time",function(){
    });
    it("Can immediately to make an open ended game at the current time",function(){
    });
    it("Prevents making a game that ends before it starts",function(){
    });
    it("Prevents making a new game while an open ended game is running",function(){
    })
});
describe("Game modification",function(){
    it("Can edit a game start time to a time that does not interfere with another game",function(){
    });
    it("Can edit a game end time to a time that does not interefere with another game",function(){
    });
    it("Can immediately end the current open ended game",function(){
    });
    It("Able to pause a game")
});