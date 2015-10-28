// /* Import node's http module: */
// var http = require("http");
// var require = require('./request-handler.js')

// // Every server needs to listen on a port with a unique number. The
// // standard port for HTTP servers is port 80, but that port is
// // normally already claimed by another server and/or not accessible
// // so we'll use a standard testing port like 3000, other common development
// // ports are 8080 and 1337.
// var port = 3000;

// // For now, since you're running this server on your local machine,
// // we'll have it listen on the IP address 127.0.0.1, which is a
// // special address that always refers to localhost.
// var ip = "127.0.0.1";



// // We use node's http module to create a server.
// //
// // The function we pass to http.createServer will be used to handle all
// // incoming requests.
// //
// // After creating the server, we will tell it to listen on the given port and IP. */
// var server = http.createServer(require.requestHandler);
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);
// debugger;
// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.


// app.post('*', function (req, res) {
//   console.log(req);
//   console.log('hello');
//   res.end(console.log('hello'));

//   // res.send('Hello World!');
// });


// app.get('/', function (req, res) {
//   res.send('yes');
// });

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://localhost', host, port);

// });




var express = require('express');
var fs = require('fs');

var app = express();
var result = [];
// var cors = require('cors');
var bodyParser = require('body-parser')
// app.use(cors);

app.use(express.static(__dirname));
app.use(bodyParser.json());
// app.use (function(req, res, next) {
    
// });
console.log(__dirname);

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/classes/', function (req, res) {
  // instead use bodyParser
  // var data='';
  //   req.setEncoding('utf8');
  //   req.on('data', function(chunk) { 
  //      data += chunk;
  //   });

  //   req.on('end', function() {
  //       // next();
  //   });
  
  result.unshift(req.body);
  fs.appendFile('messages.txt', JSON.stringify(req.body) + '\n')
  console.log(req.body);
  res.send();
});

app.get('/classes/', function(req, res) {
  var messages = fs.readFileSync('messages.txt', 'utf8');

  messages = messages.split('\n').reverse();
  messages.shift();
  messages = messages.map(function(element) {
    if (element) {
      return JSON.parse(element);
    }
  });
  console.log(messages)
  res.end(JSON.stringify({results:messages}))
})
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});