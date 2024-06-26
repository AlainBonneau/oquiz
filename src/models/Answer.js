const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Answer extends Model {}

Answer.init({
  description: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  tableName: "answer"
});

module.exports = Answer;

// Answer.findOne().then(res => console.log(res));
