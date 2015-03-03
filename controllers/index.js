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
  setUserCity : function(user, city, success, fail) {
    // {
    //   "city": "Chicago",
    //   "state": "IL"
    // }
    // 
    // models.User.find({ where: {id: user} }).on('success', function(user) {
    //   models.City.find({where: {id: 10}}).on('success', function(city){
    //     user.setCities([city]);
    //   });
    //   // if (user) { // if the record exists in the db
    //   //   user.updateAttributes({
    //   //     last_name: 'notMine'
    //   //   }).success(function() {});
    //   // }
      
    // });
  }
};



