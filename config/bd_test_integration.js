const Pool = require("pg").Pool;

// Ouverture de connexion avec la base de données en local
const poolTestIntegration = new Pool({
  user: "postgres",
  host: "localhost",
  database: "autotek",
  password: "mkdir400",
  port: 5432,
});

module.exports = poolTestIntegration;
