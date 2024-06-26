const sequelize = require("./sequelize-client");
const { Model, DataTypes } = require("sequelize");

// Définir un modèle qui étend le core model de Sequelize : Model
class Level extends Model {}

// Définir les attributs et les options du modèles
Level.init({
  // ID = bonne nouvelle, pas besoin de le déclarer : il est déjà dans le CoreModel
  // CREATED_AT & UPDATED_AT = bonne nouvelle, pas besoin de les déclarer : ils sont dans le CoreModel MAIS avec un nom de champs pas cohérent : 'createdAt' & 'updatedAt'

  // NAME
  name: {
    type: DataTypes.STRING, // STRING = VARCHAR(255) || TEXT = TEXT // EN CAS DE DOUTE : https://sequelize.org/docs/v7/models/data-types/
    allowNull: false // Equivalent de `NOT NULL` en Postgres
  }
}, {
  sequelize, // on DOIT donner l'instance de connexion à la BDD
  tableName: "level", // on DOIT préciser le nom de la table
  // createdAt: "created_at", // faire la correspondance entre `createdAt` (Sequelize) et notre `created_at` (Postgres)
  // updatedAt: "updated_at", // faire la correspondance entre `updatedAt` (Sequelize) et notre `updated_at` (Postgres)
});

// Petit test rapide de votre modèle 
// Level.findAll().then(res => console.log(res));


// Exporter notre Level
module.exports = Level;
