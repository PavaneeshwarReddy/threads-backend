const { sequelize } = require("../database");
const { DataTypes } = require("sequelize");
const userModel = require("./userModel");

const postModel = sequelize.define("post", {
  description: {
    type: DataTypes.TEXT,
    validate: {
      max: 1000,
      min: 1,
    },
  },
  likescount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  commentscount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

userModel.hasMany(postModel, {
  onDelete: "CASCADE",
  foreignKey: "userId",
});
postModel.belongsTo(userModel, {
  onDelete: "CASCADE",
  foreignKey: "userId",
});

module.exports = postModel;
