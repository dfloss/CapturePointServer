var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var models = require('./app/models');
var config = require('./config/config.json')

// configure app to use bodyParser, This could be a performance hit when hosting static files
    //might look to move it to  the router level
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Setup hosting of static files located in the public folder
app.use(express.static('public'));

//Setup CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//port settting, can be moved to config later if required
    //default to 8080 for local testing
var port = process.env.SERVERPORT || 8080; 

//The router for the capture point api
var router = express.Router();

/// middleware to use for all requests
router.use(function(req, res, next) {
    // real request logging goes here
    console.log('request recieved');
    
    //Middleware calls go here
    //RESERVERFORMIDDLEWAREFUCKINGDOIT: AUTH, VALIDAITON, MEMES
    
    next(); // go to the next routes after middleware
});

//Load all our routes, it expects: router, models, config
require('./app/routes')(router,models,config);

// Register the capturepoint api routes to /capturepointapi
app.use('/capturepointapi', router);

//Error handler defined last
app.use(function(err, req, res, next){
    res.status(err.statuscode || 500);
    res.json({
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