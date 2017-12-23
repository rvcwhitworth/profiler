var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var controller = require('./controllers');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());
app.use(morgan('dev'));

app.get('/profiles', controller.get);

app.post('/profiles', controller.post); 

app.post('/preview', controller.preview);

const port = process.env.PORT || 8008;
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
