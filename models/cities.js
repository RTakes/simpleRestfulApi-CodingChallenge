"use strict";

module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define("City", {
    city_name : DataTypes.STRING,  
    longitude : DataTypes.INTEGER,
    lattitude : DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        City.belongsTo(models.State);
      }
    }
  });

  return City;
};
