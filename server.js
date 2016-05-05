'use strict';
var http = require('http');

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('client', {redirect: false}));

app.set('trust proxy',true);
app.route('/test')
	.get(function(req, res) {
		res.sendFile('client/index.html', { root: __dirname });
	});
app.route('/')
	.get(function(req, res) {
		res.sendFile('client/index.html', { root: __dirname });
	});

var port = process.env.PORT || 3000;

http
    .createServer( app ).listen( port )
    .on( 'error', function( error ){
       console.log( "Error: \n" + error.message );
       console.log( error.stack );
    });

// console.log('Serving app on port ');
console.log('Application running at http://localhost:'+port);
