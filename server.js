var env        = process.env.NODE_ENV || 'development';
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var models = require('./app/models');
var config = require('./config/config.json')[env];
var arp = require('node-arp');
//var gpio = require('./app/gpio/hardware.js');
var controller= require('./app/controller')(models,config);
var hardware = require('./app/gpio')(controller,models);
// configure app to use bodyParser, This could be a performance hit when hosting static files
    //might look to move it to  the router level
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//application level middleware
app.use((req, res, next) => {
    if (!(timeSet) && env != "development"){
        res.sendFile('./public/init.html', {root: __dirname});
        timeSet=true;
    }
    else{
        next();
    }
});

//Setup hosting of our front end script files
app.use('/scripts/vue', express.static('node_modules/vue/dist'));
app.use('/scripts/axios', express.static('node_modules/axios/dist'));
//Setup hosting of static files located in the public folder
app.use(express.static('public'));

//Setup CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",'POST, PATCH, GET, OPTIONS, DELETE, PUT')
  next();
});

//port settting, can be moved to config later if required
    //default to 8080 for local testing
var port = process.env.SERVERPORT || 8080; 

var timeSet = false;
//The router for the capture point api
var router = express.Router();

/// middleware to use for all requests to API
router.use(function(req, res, next) {
    // real request logging goes here

    //Middleware calls go here
    //RESERVERFORMIDDLEWAREFUCKINGDOIT: AUTH, VALIDAITON, MEMES
    
    next(); // go to the next routes after middleware
});

//Load all our routes, it expects: router, models, config
require('./app/routes')(router,models,config,controller);

//Load client routes 
require('./app/clientroutes')(router,controller,config);

// Register the capturepoint api routes to /capturepointapi
app.use('/capturepointapi', router);

//Error handler defined last
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
})

//Setup the connection to the database then start the server
var options = {
    force: false
}
models.sequelize.sync(options).then(function(){
    app.listen(port);
});
console.log('Listening on: ' + port);
//gpio.start();