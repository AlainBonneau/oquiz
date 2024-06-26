const { Pool } = require("pg");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

// Connexion à la base de données
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
});

// Middleware de session
const sessionMiddleware = session({
  store: new pgSession({ 
    pool: pool, // Pool de connexion à la base de données
    tableName: "user_session", 
    createTableIfMissing: true, 
  }),

  secret: process.env.SESSION_SECRET, 
  saveUninitialized: true, 
  resave: false, 
  cookie: { secure: false }, 
});

module.exports = sessionMiddleware;
