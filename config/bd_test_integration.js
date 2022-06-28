// DataBase configuration when the environnement mode is integration ( local database )
const Pool = require("pg").Pool;

// Open a connection with the database en local mode
const poolTestIntegration = new Pool({
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_name,
  password: process.env.db_password,
  port: process.env.db_port,
});
// export the connection method
module.exports = poolTestIntegration;
 