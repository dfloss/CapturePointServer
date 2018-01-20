var chai = require("chai");
var assert = chai.assert;
var sinon = require("sinon");
var config = require("../config/config.json");
var models = require("../app/models")

var startDate = new Date();
var endDate = new Date();
endDate.setHours(endDate.getHours()+4);
var gamePath = "../app/controller"
var sandbox = sinon.sandbox.create();
function getMocks(isConflict){
    var mocks = {
        createStub: sandbox.stub(models.Game,"create"),
        findAllStub: sandbox.stub(models.Game,"findAll"),
        findOneStub: sandbox.stub(models.Game,"findOne"),
        findByIdStub: sandbox.stub(models.Game,"findById"),
        getCurrentStub: sandbox.stub(models.Game,"getCurrent"),
        updateStub: sandbox.stub(models.Game,"update"),
        controller: require(gamePath)(models,config)
    }
    mocks.controllerCreateSpy = sandbox.spy(mocks.controller.Game,"create"),
    mocks.controllerUpdateSpy = sandbox.spy(mocks.controller.Game,"update")
    if (isConflict == true){
        mocks.conflictStub = sandbox.stub(models.Game,"getConflicts")
          .callsFake(()=>{return Promise.resolve({name:"conflict game",start: startDate, end: endDate, teamId: null})});
    }
    else{
        mocks.conflictStub = sandbox.stub(models.Game,"getConflicts").callsFake(()=>{return Promise.resolve([])})
    }
    return mocks;
}
describe("sinon tests",() =>{
    it("can actually do promises",()=>{
        var testObj = {func: function(){console.log("herpderp")}};
        var teststub = sinon.stub(testObj,"func").resolves("blah")
        return testObj.func().then((message)=>{
            assert(true);
        });
    });
});
describe("Game Creation",function(){
    afterEach(()=>{
        sandbox.restore();
    });
    it("Can create a game with a start and an end with a valid timespan",function(){
        var mocks = getMocks();
        //set expected game parameters
        var expectedGame = {
            name: "testGame",
            start: startDate,
            end: endDate,
            teamId: null
        }
        return mocks.controller.Game.create(expectedGame).then(()=>{
            assert(mocks.createStub.calledWith(expectedGame), "game created with the correct settings");
        });
    });
    it("Can create an open ended game with a specific start time",function(){
        var mocks = getMocks();
        //set expected game parameters
        var expectedGame = {
            name: "testGame",
            start: startDate,
            end: null,
            teamId: null
        }
        //call the function with only a start time to test open ended game
        return mocks.controller.Game.create(expectedGame).then(()=>{
            //verify
            assert(mocks.createStub.calledWith(expectedGame),"open ended game created with the correct settings");
        });
    });
    it("Can set starting team owner for a game",function(){
        var mocks = getMocks();
        var expectedGame = {
            name: "testGame",
            start: startDate,
            end: endDate,
            teamId: 1
        }
        //Import the game controller with the mocked models
       return mocks.controller.Game.create(expectedGame).then(()=>{
            //verify
            assert(mocks.createStub.calledWith(expectedGame),"game with owning team created with correct settings");
        });
    });
    it("Prevents making a game that ends before it starts",function(){
        var mocks = getMocks();
        var badGame = {
            name: "badGame",
            start: endDate,
            end: startDate
        }
        mocks.controller.Game.create(badGame).then(()=>{
        })
        .catch((error)=>{
            testError = error;
        }).then(()=>{
            assert(testError.code == "EINVALIDPARAM","Returned the correct error code");
        });
        
    });
    it("Prevents making new games that conflict with other games",function(done){
        var mocks = getMocks(true);
        var testError = null;
        var brokenGame = {
            name: "conflictGame",
            start: startDate,
            end: endDate
        }
        mocks.controller.Game.create(brokenGame).then(()=>{
        })
        .catch((error)=>{
            //console.log(error);
            testError = error;
        }).then(()=>{
            //console.log(testError.code);
            //directly checking error return because spies don't like promise rejections
              //can you blame them?
            assert(testError.code == "ECONFLICT","Returned the correct error code");
            assert(testError.conflicts != null,"returned the conflicting games");
            //assert(mocks.controllerCreateSpy.threw());
        }).then(done,done);
        //*/
    });
});
describe("Game info retrieving",function(){
    afterEach(()=>{
        sandbox.restore();
    }); 
    it("Can get a list of all games",function(){
        mocks = getMocks();
        mocks.controller.Game.getAll();
        assert(mocks.findAllStub.called, "Queried for all games");
    });
    it("Can get a specific game",function(){
        var mocks = getMocks();
        id = 1;
        mocks.controller.Game.get(id);
        assert(mocks.findByIdStub.calledWith(id));
    });
    it("Can get the current game",function(){
        var mocks = getMocks();
        mocks.controller.Game.getCurrent();
        assert(mocks.findOneStub.called);
    });
});
describe("Game modification",function(){
    afterEach(()=>{
        sandbox.restore();
    });
    it("Can edit a game start and end time to a valid time span that does not interfere with another game",function(){
        var mocks = getMocks();
        var expectedGame = {
            id: 1,
            name: "testGame",
            start: startDate,
            end: endDate,
            teamId: null
        }
        return mocks.controller.Game.update(expectedGame).then(()=>{
            delete expectedGame.id;
            sinon.assert.calledWith(mocks.updateStub, expectedGame,{where:{id: gameId}});
        });
    });
    /* Not for PoC
    it("Can immediately end the current open ended game",function(){
        expect(true).to.equal(false);
    });
//    */    
    /* Not for PoC
    it("Can pause a game",function(){
        expect(true).to.equal(false);
    });
//    */
    it("Prevents editing a game to collide with another game",function(done){
        var mocks = getMocks(true);
        var expectedGame = {
            id: 1,
            name: "testGame",
            start: startDate,
            end: endDate,
            teamId: null
        }
        var testError;
        mocks.controller.Game.update(expectedGame).then(()=>{
        }).catch((error)=>{
            //console.log(error);
            testError=error;
        }).then(()=>{
            assert(testError.code == "ECONFLICT","Returned the correct error code");
            assert(testError.conflicts != null,"returned the conflicting games");
            //sinon.assert.threw(controllerUpdateSpy,"Game updated time conflicts with other games");
            //sinon.assert.threw(controllerUpdateSpy);
        }).then(done,done);
    });
    it("Prevents removing the start date from a game",function(){
        var mocks = getMocks();
        var badGame = {
            id: 1,
            start: null
        };
        mocks.controller.Game.update(badGame).then(()=>{
        })
        .catch((error)=>{
            testError = error;
        }).then(()=>{
            assert(testError.code == "EINVALIDPARAM","Returned the correct error code");
        });
    });
    it("Prevents removing the name from a game",function(){
        var mocks = getMocks();
        var badGame = {
            id: 1,
            name: ""
        };
        mocks.controller.Game.update(badGame).then(()=>{
        })
        .catch((error)=>{
            testError = error;
        }).then(()=>{
            assert(testError.code == "EINVALIDPARAM","Returned the correct error code");
        });
    })
});
describe("Game deletion",function(){
    afterEach(()=>{
        sandbox.restore();
    });
    it("Can remove a game",function(){
        var mocks = getMocks();
        var destroyStub = sandbox.stub();
        mocks.findByIdStub.resolves({
            destroy: destroyStub
        });
        var game = {
            id: 1
        }
        return mocks.controller.Game.delete(game).then(()=>{
            assert(mocks.findByIdStub.calledWith(1),"look up correct id number for deletion");
            assert(destroyStub.called,"destroy function called on the resulting model");
        });
    });
});