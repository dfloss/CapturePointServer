var expect = require("chai").expect;
var games = require("../app/controller/games");
var config = require("../config/config.json");

describe("Game creation",function(){
    it("Can create a game with a start and an end that ends after it starts",function(){
        expect(true).to.equal(false);
    });
    it("Can create an open ended game that starts after the current time",function(){
        expect(true).to.equal(false);
    });
    it("Can immediately to make an open ended game at the current time",function(){
        expect(true).to.equal(false);
    });
    it("Prevents making a game that ends before it starts",function(){
        expect(true).to.equal(false);
    });
    it("Prevents making a new game while an open ended game is running",function(){
        expect(true).to.equal(false);
    })
});
describe("Game info retrieving",function(){
    it("Can get a list of all games",function(){
        expect(true).to.equal(false);
    });
    it("Can geta specific game",function(){
        expect(true).to.equal(false);
    });
    it("Can get the current game",function(){
        expect(true).to.equal(false);
    });
})
describe("Game modification",function(){
    it("Can edit a game start time to a time that does not interfere with another game",function(){
        expect(true).to.equal(false);
    });
    it("Can edit a game end time to a time that does not interefere with another game",function(){
        expect(true).to.equal(false);
    });
    it("Can immediately end the current open ended game",function(){
        expect(true).to.equal(false);
    });
    it("Can pause a game",function(){
        expect(true).to.equal(false);
    });
    it("Prevents editing a game to collide with another game",function(){
        expect(true).to.equal(false);
    });
    it("Prevents removing the end or start date from a game",function(){
        expect(true).to.equal(false);
    });
});
describe("Game deletion",function(){
    it("Can remove a game",function(){
        expect(true).to.equal(false);
    });
})