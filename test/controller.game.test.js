var expect = require("chai").expect;
var sinon = require("sinon");
var config = require("../config/config.json");
var models = require("../app/models")

var initDate = new Date();
describe("Game creation",function(){
    it("Can create a game with a start and an end with a valid timespan",function(){
        //set expected game parameters
        var expectedGame = {
            name: "testGame",
            gameStart: initDate,
            gameEnd: initDate.setHours(initDate.getHours()+4)
        }
        //setup mocks, stubs and spies
            //mocking game model create function and setting expectations
        var modelsMock = sinon.mock(models.game);
        createMock.expects("create").once().calledWith(expectedGame);
        //Import the game controller with the mocked models
        var game = require("../app/controller/game")(modelsMock,config);
        game.create("testGame",gameStart,gameEnd);
        //verify
        createMock.verify();
    });
    it("Can create an open ended game that starts after the current time",function(){
        //set expected game parameters
        var expectedGame = {
            name: "testGame",
            gameStart: initDate,
            gameEnd: initDate.setHours(initDate.getHours()+4)
        }
        //setup mocks, stubs and spies
            //mocking game model create function and setting expectations
        var modelsMock = sinon.mock(models.game);
        createMock.expects("create").once().calledWith(expectedGame);
        //Import the game controller with the mocked models
        var game = require("../app/controller/game")(modelsMock,config);
        game.create(expectedGame.name,expectedGame.gameStart,expectedGame.gameEnd);
        //verify
        createMock.verify();
    });
    it("Can immediately make an open ended game at the current time",function(){
        expect(true).to.equal(false);
    });
    it("Prevents making a game that ends before it starts",function(){
        expect(true).to.equal(false);
    });
    it("Prevents making a new game while an open ended game is running",function(){
        expect(true).to.equal(false);
    });
    it("Can set starting team owner for a game",function(){
        expect(true).to.equal(false);
    });
    it("Can persist the starting team owner from the previous game",function(){
        expect(true).to.equal(false);
    });
});
describe("Game info retrieving",function(){
    it("Can get a list of all games",function(){
        expect(true).to.equal(false);
    });
    it("Can get a specific game",function(){
        expect(true).to.equal(false);
    });
    it("Can get the current game",function(){
        expect(true).to.equal(false);
    });
})
describe("Game modification",function(){
    it("Can edit a game start and end time to a valid time span that does not interfere with another game",function(){
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