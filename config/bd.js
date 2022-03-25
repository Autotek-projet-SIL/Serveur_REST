const Pool = require('pg').Pool

/*const pool = new Pool({
  user: 'utilisateur_autotek@serveurautotekbdd',
  host: 'serveurautotekbdd.postgres.database.azure.com',
  database: 'autotek',
  password: 'Autotek2022*',
  port: 5432,
})*/

const pool = new Pool({
  user: 'postgres_admin@serveurautotekbdd',
  host: 'serveurautotekbdd.postgres.database.azure.com',
  database: 'autotek',
  password: 'Autotek2022*',
  port: 5432,
})

/*const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'autotek',
  password: 'AdministrateurAutotek2022*',
  port: 5432,
})*/

module.exports=pool