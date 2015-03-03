var controller = require("../controllers");
var models = require("../models");

module.exports = function(app){
//Routes

	//Default route
	app.get('/', function(req, res, next){
		res.send('hi there');
	});

	//Get the cities in a state
	app.get('/v1/states/:state/cities', function(req, res, next){
		var state = req.params.state;
		controller.getCitiesByState(state, function(data){
			res.send(data);
		}, function(error){
			res.send('An error occurred. ' + error);
			console.error(error);
		});
	});

	//Get cities within a specified radius
	app.get('/v1/states/:state/cities/:city', function(req, res, next){
		var state = req.params.state;
		var city = req.params.city;
		var radius = req.query.radius || 100;
		controller.getCitiesByRadius(city, state, radius, function(data){
			res.send(data);
		}, function(error){
			res.send('An error occurred. ' + error);
			console.error(error);
		});
	});

	//Get cities user has visited
	app.get('/v1/users/:user/visits', function(req, res, next){
		var user = req.params.user;
		controller.getCitiesByUser(user, function(data){
			res.send(data);
		}, function(error){
			res.send('An error occurred. ' + error);
			console.error(error);
		});
	});

	//Allow user to post new cities they have visited
	app.post('/v1/users/:user/visits', function (req, res, next) {
		var userId = req.params.user;
		var cityData = req.body;

		controller.setUserCity(userId, cityData, function(data){
			res.send(data);
		}, function(error){
			res.send('An error occurred. ' + error);
			console.error(error);
		});
	});

};





