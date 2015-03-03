var models = require('../models');

module.exports = {
  getCitiesByState : function(state, success, fail) {
    //var attributes = ['id', 'name', 'bar.version', ['bar.last_modified', 'changed']];
    var attr = ['id', 'city_name'];
    models.State.find({
      where: {abbreviation : state}, 
      include:[{model: models.City, attributes: attr}]
    })
    .then(function(data){
      var returnData = data.Cities;
      success(data.Cities);
    })
    .catch(function(error){
      console.log(error);
    })
    .finally(function(){
      // finally gets called always regardless of whether the promises resolved with or without errors.
    });
  },
  getCitiesByUser : function(user, success, fail) {
    models.User.find({ 
      where: {id: user} 
    })
    .then(function(user){
      if(user){
        user.getCities()
        .then(function(data){
          success(data);
        });
      }else{
        var message = [{message: 'No cities found'}];
        success(message);
      }
    })
    .catch(function(error){
      fail(error);
    })
    .finally(function(){
      // finally gets called always regardless of whether the promises resolved with or without errors.
    })
  },
  getCitiesByRadius: function(city, distance, success, fail){

  },
  setUserCity : function(userId, cityData, success, fail) {    
    models.City.findAll({
      where: {city_name:cityData.city},
      include: {model: models.State}
    }).then(function(city){
      for(var k in city){
        var cityState = city[k];
        console.log(cityState.State.abbreviation, cityData.state);
        if(cityState.State.abbreviation === cityData.state){
          models.User.find({
            where: {id: userId}
          }).then(function(user){
            user.setCity(city);
          })
          // console.log('CITY------------------------------');
          // console.log(cityState);
        }
        //console.log(cityState.State.abbreviation);
      }
      //console.log(city);
    });
  }
};



