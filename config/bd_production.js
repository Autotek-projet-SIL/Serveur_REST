const Pool = require("pg").Pool;

// Ouverture de connexion avec la base de données en production
const poolProduction = new Pool({
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_name,
  password: process.env.db_password,
  port: process.env.db_port,
});

module.exports = poolProduction;
