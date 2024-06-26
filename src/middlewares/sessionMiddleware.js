const pg = require("pg");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

// Connexion à la base de données
const client = new pg.Client(process.env.PG_URL);
client.connect();

// Middleware de session
const sessionMiddleware = session({
  store: new pgSession({ // Store de session
    pool: client, // Pool de connexion à la base de données
    tableName: "user_session", // Nom de la table de session
    createTableIfMissing: true, // Crée la table de session si elle n'existe pas
  }),

  secret: process.env.SESSION_SECRET, // Clé secrète pour signer le cookie de session
  saveUninitialized: true, // Sauvegarde la session même si elle n'est pas modifiée
  resave: false, // Ne sauvegarde pas la session si elle n'a pas été modifiée
  cookie: { secure: false }, // Cookie non sécurisé (http)
});

module.exports = sessionMiddleware;
