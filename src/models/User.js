const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class User extends Model {
  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}

User.init(
  {
    firstname: {
      type: DataTypes.STRING,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("member", "admin"),
      defaultValue: "member",
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);

module.exports = User;
