'use strict';
var http = require('http');

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
app.set('trust proxy',true);

app.use(express.static('client', {redirect: false}));

app.route('/test')
	.get(function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client','index.html'));
	});
app.route('/')
	.get(function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client','index.html'));
	});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Application running at http://localhost:'+port);
});

// console.log('Serving app on port ');
console.log('Application running at http://localhost:'+port);
