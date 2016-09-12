var express = require('express')
var moment = require('moment')
var url = require('url');
var app = express();

app.get('/*', function (req, res) {
    var reqUrl = url.parse(req.url, true);
    console.log(reqUrl);
    var query = decodeURI(reqUrl.pathname.substring(1));
    console.log(query);
    var json;
    if (moment(query, "MMMM DD, YYYY", true).isValid()){
        json = JSON.stringify({unix: moment(query, 'MMMM DD, YYYY', true).format('X'), natural: moment(query, 'MMMM DD, YYYY', true).format('MMMM DD, YYYY')});
    }else if(moment(query, 'X', true).isValid()){
        json = JSON.stringify({unix: moment(query, 'X', true).format('X'), natural: moment(query, 'X', true).format('MMMM DD, YYYY')});
        
    }else{
        json = JSON.stringify({unix: 'null', natural: 'null'});
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(json);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

var net = require("net");
var strftime = require('strftime')

var server = net.createServer(function (socket) {
    socket.end(strftime('%F %R\n', new Date()));
});

server.listen(process.argv[2]);