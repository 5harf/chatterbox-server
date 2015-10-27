
var url = require('url');
var fs = require('fs');
var results = [];


var qs = require('querystring');
var requestHandler = function (req, res) {

  fs.readFile(__dirname + req.url, function (err,data) {
    var statusCode = 200;
    var headers = defaultCorsHeaders;

    if (req.method == 'POST') {
      var body = ''
      statusCode++
      req.on('data', function (data) {
        body += data;

        if (body.length > 1e6)
          req.connection.destroy();
      });

      req.on('end', function () {
        var post = JSON.parse(body);
        console.log(post)
        results.unshift(post);
        fs.appendFile('messages.txt', JSON.stringify(post)+'\n'); 
        // console.log(jsonStuff);
      });
        
    }



  if (req.method = 'GET') { 
    if (req.url === '/classes/' || req.url === '/classes/messages' || req.url === '/classes/room1') {
      results = fs.readFileSync('./messages.txt', 'utf8');
      results = results.split('\n').reverse();

      console.log((results));
      results = results.map(function(element) {
        if (element) {
          return JSON.parse(element);
        }

      });
      results.shift();
      res.writeHead(statusCode, headers);
      res.end(JSON.stringify({results:results}));
    } 
  }

    
    res.writeHead(200);
    res.end(data);
  });
};

  

exports.requestHandler = requestHandler;

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "JSON"
};

