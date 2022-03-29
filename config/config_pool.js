//Pool pour l'accés a la base de données
let pool = null
if (process.env.NODE_ENV === "test_unitaire") {
  console.log("1")
  pool = require("../config/bd_test_unitaire")
} else if(process.env.NODE_ENV === "production"){
  console.log("2")
  pool = require("../config/bd_production")
} else{
  console.log("3")
  pool = require("../config/bd_test_integration")
}
module.exports=pool
