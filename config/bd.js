const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'autotek',
  password: 'AdministrateurAutotek2022*',
  port: 5432,
})

module.exports=pool