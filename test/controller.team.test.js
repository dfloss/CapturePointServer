var expect = require("chai").expect;
var games = require("../app/controller/team");
var config = require("../config/config.json");
var models = require("../app/models")

describe("Team Creation",function(){
    it("Will create a new team with a unique name",function(){
        expect(true).to.equal(false);
    });
    it("Will block non-unique team names",function(){
        expect(true).to.equal(false);
    });
});
describe("Team Removal",function(){
    it("Will delete a team based on id",function(){
        var teamMock = sinon.mock(models.team)
        teamMock.verify();
    });
})
describe("Team modification",function(){
    it("Can change a team",function(){
        expect(true).to.equal(false);
    });
    it("Will prevent changing a team name to a duplicate name",function(){

    });
});