"use strict";

module.exports = function(sequelize, DataTypes) {
  var State = sequelize.define("State", {
    name : DataTypes.STRING,
    abbreviation : DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        State.hasMany(models.City);
      }
    }
  });

  return State;
};