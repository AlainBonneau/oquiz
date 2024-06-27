require("dotenv/config");

const { Sequelize } = require("sequelize");

// Créer une instance de connexion à notre BDD oquiz
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: console.log,
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
