// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//Ajouter une location
const addTrajet = async (request, response) =>{
  let body = request.body 
  pool.query('INSERT INTO trajet( point_depart, point_arrive)VALUES ( $1,$2)',[ body.point_depart, body.point_arrive ] ,
      (error, results) => { if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
       response.statusCode == 500;
    }
  
   
  
   // response.sendStatus(response.statusCode);
  })
}


//Exporter les fonctions CRUD du trajet
module.exports = {
  addTrajet,
};
