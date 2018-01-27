var chai = require("chai");
var mocha = require("mocha");
var assert = chai.assert;
var sinon = require("sinon");
var sequelize = require("sequelize");
var models = require("../app/models");
var controller= require('./app/controller')(models,config);
var express = require("express");
var bodyparser = require("body-parser")
var request = require('supertest');

function equalityTest(ref,compare){
    return JSON.stringify(ref) === JSON.stringify(compare);
}
function setupRoutes(){
    var port = process.env.SERVERPORT || 8080; 
    var app = express();
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json());
    var router = express.Router();

    require('../app/routes')(router,models,config,controller);
    require('../app/clientroutes')(router,controller,config);

    app.use(router);
    app.use(function(err, req, res, next){
        let status;
        switch (err.code){
            case "ECONFLICT":
                status = 400;
                break;
            case "EINVALIDPARAM":
                status = 400;
                break;
            default:
                status = 500;
                break;
        }
        res.status(status);
        console.log(err);
        res.json({
            result: err.result,
            message: err.message,
            error: err,
            success: false
        })
    });
    return app.listen(8080,()=>{
        console.log(`Server started`)
    });
}