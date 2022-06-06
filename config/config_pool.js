// Choix d'un pool en fonction de la varibale d'environement

let pool = null;
if (process.env.NODE_ENV === "test_unitaire") {
  pool = require("../config/bd_test_unitaire");
} else if (process.env.NODE_ENV === "production") {
  pool = require("../config/bd_production");
} else {
  pool = require("../config/bd_test_integration");
}
// Exporter le pool
module.exports = pool;
