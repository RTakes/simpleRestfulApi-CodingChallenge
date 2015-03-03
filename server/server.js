var express = require('express');
var app = express();
var models = require("../models");
var bodyParser = require('body-parser');
var expressSanitized = require('express-sanitized');

//Setup body parser for post requests
app.use(bodyParser.json());
app.use(expressSanitized());

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./routes')(app);