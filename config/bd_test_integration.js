const Pool = require("pg").Pool;

const poolTestIntegration = new Pool({
  user: "utilisateur_autotek",
  host: "localhost",
  database: "autotek",
  password: "UtilisateurAutotek2000*",
  port: 5432,
});

module.exports = poolTestIntegration;