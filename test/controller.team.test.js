var chai = require("chai");
var assert = chai.assert;
var sinon = require("sinon");
var config = require("../config/config.json");
var models = require("../app/models")

var sandbox = sinon.sandbox.create();
function getTeamMocks(){
    return {
        createStub: sandbox.stub(models.Team,"create"),
        updateStub: sandbox.stub(models.Team,"update").resolves(null),
        destroyStub: sandbox.stub(models.Team,"destroy"),
        findOneStub: sandbox.stub(models.Team,"findOne"),
        controller: require("../app/controller")(models,config)
    }
}
describe("Team Creation",function(){
    afterEach(()=>{
        sandbox.restore();
    })
    /* Not in PoC
    it("Will create a new team",function(){
        var mocks = getTeamMocks();
        var expectedTeam = {
            name: "HerpDerps"
        }
    });*/
    /* //don't need to test sequelize validations right now
    it("Will block non-unique team names",function(){
        expect(true).to.equal(false);
    });
    */
});
/*not in PoC
describe("Team Removal",function(){
    it("Will delete a team based on id",function(){
        assert
    });
})
*/
describe("Team modification",function(){
    it("Can change a team's name, webColor, and simpleColor to valid values",function(){
        var mocks = getTeamMocks();
        var team = {
            id: 1,
            name: "HappyPathers",
            simpleColor: "Green",
            webColor: "FFFFFF",
            active: true
        }
        return mocks.controller.Team.update(team).then(()=>{
            delete team.id;
            //using sinon assert because chai doesn't seem to like called with multiple args
            sinon.assert.calledWith(mocks.updateStub, team,{where:{id: 1}});
        });
        
    });
    it("Returns Validation errors for simpleColor",()=>{
        var team = {
            id: 1,
            name: "HappyPathers",
            simpleColor: "Nope",
            webColor: "FFFFFF",
            active: true
        }
        var testError;
        return mocks.controller.Team.update(team).then(()=>{
        }).catch((error)=>{
            testError = error;
        }).then(()=>{
            assert(testError.code == "EINVALIDPARAM");
            assert(testError.param == "simpleColor");
        });
    });
    it("Returns Validation erros for webColor",()=>{
        var team = {
            id: 1,
            name: "HappyPathers",
            simpleColor: "Green",
            webColor: "PurplishGray",
            active: true
        }
        var testError;
        return mocks.controller.Team.update(team).then(()=>{
        }).catch((error)=>{
            testError = error;
        }).then(()=>{
            assert(testError.code == "EINVALIDPARAM");
            assert(testError.param == "webColor");
        });
    });
    /* //no need to test sequelize validations in unit tests
    it("Will prevent changing a team name to a duplicate name",function(){

    });
    */
});