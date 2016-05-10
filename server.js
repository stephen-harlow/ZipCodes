'use strict';
var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
app.set('trust proxy',true);

app.use(express.static('client', {redirect: false}));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
var env = process.env.NODE_ENV || "development";
if(env === "development"){

  app.route('/test')
  .get(function(req, res) {
    res.sendFile('client/index.html', { root: __dirname });
  });


  app.route('/')
  .get(function(req, res) {
    res.sendFile('client/index.html', { root: __dirname });
  });
}
else{
  app.route('/test')
  	.get(function(req, res) {
      res.sendFile(path.join(__dirname, '..', 'client','index.html'));
  	});
  app.route('/')
  	.get(function(req, res) {
      res.sendFile(path.join(__dirname, '..', 'client','index.html'));
  	});
}
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Application running at http://localhost:'+port);
});
