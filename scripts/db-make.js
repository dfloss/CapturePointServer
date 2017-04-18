var pg = require("pg");
var env = process.env.NODE_ENV || 'test';
var dbconfig = require('../config/dbconfig.json')[env];

var pgurl = "postgres://localhost:5432/postgres";
var client = new pg.Client(pgurl);

client.connect(function(err){
    if(err){throw err;}

    client.query(`CREATE DATABASE ${dbconfig["database"]}`);
    client.query(`CREATE USER ${dbconfig["username"]} WITH PASSWORD '${dbconfig["password"]}'`);
    client.query(`GRANT ALL PRIVILEGES ON ${dbconfig["database"]} TO ${dbconfig["username"]}`);
})