const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Tag extends Model {}

Tag.init({
  name: {
    type: DataTypes.STRING, // VARCHAR(255)
    allowNull: false
  }
}, {
  sequelize,
  tableName: "tag"
});

module.exports = Tag;
