// Seeder for setting Default Team values

var models = require('../app/models');

//Set Team Data
teamdata = [
    {
        name: "team1",
        active: false
    },
    {
        name: "team2",
        active: false
    },
    {
        name: "team3",
        active: false
    },
    {
        name: "team4",
        active: false
    },
    {
        name: "team5",
        active: false
    },
    {
        name: "team6",
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
    Promise.all([teamPromises]).then(function () {
        console.log("Team Defaults set");
        process.exit();
    });
});