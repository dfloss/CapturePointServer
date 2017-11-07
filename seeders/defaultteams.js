// Seeder for setting Default Team values

var models = require('../app/models');

//Set Team Data
teams = [
    {
        name: "team1",
        simpleColor: 'Green',
        webColor: '00ff00',
        active: true
    },
    {
        name: "team2",
        simpleColor: 'Orange',
        webColor: 'd2b48c',
        active: true
    },
    {
        name: "team3",
        simpleColor: 'Red',
        webColor: 'ff0000',
        active: false
    },
    {
        name: "team4",
        simpleColor: 'Blue',
        webColor: '0000ff',
        active: false
    },
    {
        name: "team5",
        simpleColor: 'Yellow',
        webColor: 'ffff00',
        active: false
    },
    {
        name: "team6",
        simpleColor: 'Purple',
        webColor: '800080',
        active: false
    },
]

//reset DB, all seeders should do this
models.sequelize.sync({ force: true }).then(function () {
    var teamPromises = [
        models.Team.create(teams[0]),
        models.Team.create(teams[1]),
        models.Team.create(teams[2]),
        models.Team.create(teams[3]),
        models.Team.create(teams[4]),
        models.Team.create(teams[5])
    ]
    Promise.all(teamPromises).then(function () {
        console.log("Team Defaults set");
        process.exit();
    });
});