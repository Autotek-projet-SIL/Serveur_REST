// Declaration de variables
// Pool pour l'accés a la base de données
let pool = null;
if (process.env.NODE_ENV === "test_unitaire") {
  pool = require("../config/bd_test_unitaire");
} else if (process.env.NODE_ENV === "production") {
  pool = require("../config/bd_production");
} else {
  pool = require("../config/bd_test_integration");
}
module.exports = pool;
