var models = require('../models');
//var Q = require('q');


function getAll(model, success){
  model.findAll({
   //include: [ models.Sensor ]
  }).then(function(data) {
    console.log(data);
    success(data);
  })
  .fail(function (error) {
    console.log(error);
  });
};

function getWhere(model, whereObj, success){
  model.find(whereObj, {raw: true})
  .then(function(data) {
    success(data);
  })
  .fail(function (error) {
    next(error);
  });
};

function deleteItem(model, id, success){
  model.destroy({where: {id: id}})
  .then(function(data) {
    success(data);
  })
  .fail(function (error) {
    next(error);
  });
};

module.exports = {
  getAll: function(model, success){
    model.findAll({
     //include: [ models.SOMETHING ]
    }).then(function(data) {
      console.log(data);
      success(data);
    })
    .fail(function (error) {
      console.log(error);
    });
  },
  getWhere : function(model, whereObj, success){
    model.find(whereObj, {raw: true})
    .then(function(data) {
      success(data);
    })
    .fail(function (error) {
      next(error);
    });
  },
  createRecord: function(model, data, success){
    var data = req.body;

    // models.Device.create({
    //   device_id : data.id,
    //   device_name : data.name,  
    //   device_loc_name : data.location,
    //   device_loc_longitude : data.long,
    //   device_loc_lattitude : data.lat
    // });
    // 
    console.log(req.body);
    res.send(req.body);
  },
  deleteItem : function(req, res, next){
    models.Device.destroy
  },
  updateItem : function(req, res, next){

  }
};




// var User = sequelize.define('users', {
//     username: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     instanceMethods: {
//       retrieveAll: function(onSuccess, onError) {
//     User.findAll({}, {raw: true})
//       .success(onSuccess).error(onError); 
//     },
//       retrieveById: function(user_id, onSuccess, onError) {
//     User.find({where: {id: user_id}}, {raw: true})
//       .success(onSuccess).error(onError); 
//     },
//       add: function(onSuccess, onError) {
//     var username = this.username;
//     var password = this.password;
    
//     var shasum = crypto.createHash('sha1');
//     shasum.update(password);
//     password = shasum.digest('hex');
    
//     User.build({ username: username, password: password })
//       .save().success(onSuccess).error(onError);
//      },
//     updateById: function(user_id, onSuccess, onError) {
//     var id = user_id;
//     var username = this.username;
//     var password = this.password;
    
//     var shasum = crypto.createHash('sha1');
//     shasum.update(password);
//     password = shasum.digest('hex');
          
//     User.update({ username: username,password: password},{where: {id: id} })
//       .success(onSuccess).error(onError);
//      },
//       removeById: function(user_id, onSuccess, onError) {
//     User.destroy({where: {id: user_id}}).success(onSuccess).error(onError); 
//     }
//     }
//   }); 