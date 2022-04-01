const Pool = require('pg').Pool

const poolProduction = new Pool({
  user: 'utilisateur_autotek@serveurautotekbdd',
  host: 'serveurautotekbdd.postgres.database.azure.com',
  database: 'autotek',
  password: 'Autotek2022**',
  port: 5432,
})

  module.exports=poolProduction
