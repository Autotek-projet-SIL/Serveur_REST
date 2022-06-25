// DataBase pool choice depending on the environement variable

let pool = null;
if (process.env.NODE_ENV === "test_unitaire") {      // case of unit test mode
  pool = require("../config/bd_test_unitaire");
} 
else if (process.env.NODE_ENV === "production") {    // case of production mode
  pool = require("../config/bd_production");
} 
else {                                              // case of integration test mode
  pool = require("../config/bd_test_integration");     
}

// Export the pool
module.exports = pool;
