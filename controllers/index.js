var models = require('../models');
var distCalculator = require('./distance');

module.exports = {
  getCitiesByState : function(state, success, fail) {
    var attr = ['city_name'];
    models.State.find({
      where: {abbreviation : state}, 
      include:[{model: models.City, attributes: attr}]
    })
    .then(function(data){
      success(data.Cities);
    })
    .catch(function(error){
      fail(error);
    })
    .finally(function(){
      // finally gets called always regardless of whether the promises resolved with or without errors.
    });
  },
  getCitiesByUser : function(user, success, fail) {
    var attr = ['id', 'city_name', 'longitude', 'latitude'];
    models.User.find({ 
      where: {id: user},
      include:[{model: models.City, attributes: attr}] 
    })
    .then(function(user){
      success(user.Cities);
    })
    .catch(function(error){
      fail(error);
    })
    .finally(function(){
      // finally gets called always regardless of whether the promises resolved with or without errors.
    })
  },
  getCitiesByRadius: function(cityName, state, distance, success, fail){
    /**
     * 70mi is approximately equal to the greatest distance between lines of lat and long.
     * We use this to filter out query, so that we can reduce the amount of data process.
     */
    var threshold = distance / 70; 

    models.State.find({
      where: {abbreviation: state}
    }).then(function(state){
      models.City.findAll({
        where: {city_name:cityName, StateId: state.id}
      })
      .then(function(city){
        var cityData = city[0];
        var longHi = cityData.longitude+threshold;
        var longLow = cityData.longitude-threshold;

        var latHi = cityData.latitude+threshold;
        var latLow = cityData.latitude-threshold;

        //Get all cities within approximate range
        models.City.findAll({
          where: ["longitude BETWEEN "+longLow+" AND "+longHi+" AND latitude BETWEEN "+latLow+" AND "+latHi+" "]
        }).then(function(cities){

          var localCities = [];

          //Check for exact distances
          for(var i=0; i<cities.length; i++){
            var curCity = cities[i];
            var dist = distCalculator.getDistance(cityData, curCity);
            if(dist <= distance){
              localCities.push(curCity);
            }
          }
          success(localCities);
        }).catch(function(error){
          fail(error);
        });
      })
      .catch(function(error){
          fail(error);
      });
    });
  },
  setUserCity : function(userId, cityData, success, fail) {    
    models.City.findAll({
      where: {city_name:cityData.city},
      include: {model: models.State}
    }).then(function(city){

      //Multiple cities may have the same name.
      //This gets only the city matching city name and state
      for(var k in city){
        var cityState = city[k];
        if(cityState.State.abbreviation === cityData.state){
          models.User.find({
            where: {id: userId}
          })
          .then(function(user){
            user.addCities([city[k]])
            .catch(function(error){
              fail(error);
          })
          .then(function(data){
              success([{'message': 'User city updated'}]);
            });
          })
          .catch(function(error){
            fail(error);
          });
        }else{
          throw new Error('City or State not found'); 
        }
      }
    })
    .catch(function(error){
      fail(error);
    });
  }
};



