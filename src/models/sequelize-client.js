require("dotenv/config");

const { Sequelize } = require("sequelize");

// Créer une instance de connexion à notre BDD oquiz
const sequelize = new Sequelize(process.env.PG_URL, {
  logging: console.log,
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

module.exports = sequelize;
