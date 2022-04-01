const Pool = require('pg').Pool

const poolTestIntegration =new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'autotek',
    password: 'mkdir400',
    port: 5432,
  })

module.exports=poolTestIntegration