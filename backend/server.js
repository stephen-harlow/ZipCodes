var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');


var app = express();

app.set('trust proxy',true);

var isProduction = process.env.NODE_ENV === 'production';
var host = process.env.APP_HOST || 'localhost';
var port = isProduction ? 8080 : 3000;
var publicPath = path.resolve(__dirname, '..', 'public');


app.use(express.static(publicPath));

// place your handlers here
app.get('/', function(req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});
// place your handlers here
app.get('/test', function(req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, function () {
  console.log('Server running on port ' + port);
});
