const Pool = require("pg").Pool;

// Ouverture de connexion avec la base de données en local
const poolTestIntegration = new Pool({
  user: "utilisateur_autotek",
  host: "localhost",
  database: "autotek",
  password: "UtilisateurAutotek2022*",
  port: 5432,
});

module.exports = poolTestIntegration;
