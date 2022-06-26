// DataBase configuration when the environnement mode is integration ( local database )
const Pool = require("pg").Pool;

// Open a connection with the database en local mode
const poolTestIntegration = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
// export the connection method
module.exports = poolTestIntegration;
