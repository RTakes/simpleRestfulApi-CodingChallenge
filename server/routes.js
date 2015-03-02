var controller = require("../controllers");
var models = require("../models");

module.exports = function(app){
//Routes
	app.get('/', function(req, res, next){
		res.send('hi there');
	});


};