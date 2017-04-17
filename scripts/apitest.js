var http = require('http');

var options = {
  host: 'localhost',
  port: 8080,
  parentPath: '/capturepointapi/'
};

var seedGames = [
    
]

function getApiRequest(options,path){
    options.path = options.parentPath + '/' + path
    http.get(options, function(resp){
    resp.setEncoding('utf8');
  resp.on('data', function(chunk){
      console.log(`recieved data for: ${path}`)
      console.log(chunk);
  });
function postApiRequest(options,path,body)
}).on("error", function(e){
  console.log("Got error: " + e.message);
});
}
http.get(options, function(resp){
    resp.setEncoding('utf8');
  resp.on('data', function(chunk){
      console.log(chunk);
  });
}).on("error", function(e){
  console.log("Got error: " + e.message);
});