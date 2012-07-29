var connect = require('connect');
var http = require('http');
var fs = require("fs");
var url = require("url");

var admin = function(req, res){
  params = url.parse(req.url, true).query;
  farm_host = 'farm' + params.h + '.staticflickr.com'
  options = {
    host: farm_host,
    port: 80,
    path: params.f
  };
  var request = http.get(options, function (result) {
    var img = "";
    result.setEncoding('binary');
    result.on('data', function (chunk) {
      if (result.statusCode == 200) {
        img += chunk;
      }
    });
    result.on('end', function () {
      res.setHeader('Transfer-Encoding', 'chunked');
      res.setHeader('Content-Type', 'image/jpeg');
      res.end(img, 'binary');
    });
  });
  request.on( 'error', function(e){
    console.log(e);
  });
};

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.bodyParser())
  .use( connect.static(__dirname))
  .use('/img/tjmood', admin)
  .use( function(req, res){
    res.end('try /img/tjmood');
  });

http.createServer(app).listen(8080);
