var express = require('express');
var app = express();
// set render engine
var ejs = require('ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
// set the resource path
app.use(express.static(__dirname + '/public'));
require('./route')(app);
app.listen(3000);
console.log('Listening on port 3000');