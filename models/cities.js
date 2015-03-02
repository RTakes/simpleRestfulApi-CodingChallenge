"use strict";

module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define("City", {
    city_name : DataTypes.STRING,  
    longitude : DataTypes.FLOAT,
    lattitude : DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        City.belongsTo(models.State);
        City.hasMany(models.User);
      }
    }
  });

  return City;
};
