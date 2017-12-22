var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database');
var morgan = require('morgan');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(morgan.tiny());



app.get('/', function (req, res) {
  res.end();
});


const port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
