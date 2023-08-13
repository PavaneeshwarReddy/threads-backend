const { sequelize } = require("../database");
const { DataTypes } = require("sequelize");

const userModel = sequelize.define("user", {
  username: {
    type: DataTypes.TEXT,
    validate: {
      min: 6,
    },
  },
  password: {
    type: DataTypes.TEXT,
    validate: {
      min: 8,
    },
  },
});

module.exports = userModel;
