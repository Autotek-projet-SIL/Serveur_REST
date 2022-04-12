// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Recuperer la des locations acceptes
const getLocationsAcceptes = async (request, response) => {
  pool.query(
    "SELECT * FROM louer where statut_demande_location = accepte",
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

// Recuperer la des locations rejetes
const getLocationsRejetes = async (request, response) => {
    pool.query(
      "SELECT * FROM louer where statut_demande_location = rejete",
      (error, results) => {
        if (error) {
          log.loggerConsole.error(error);
          log.loggerFile.error(error);
          response.sendStatus(500);
        } else {
          response.status(200).json(results.rows);
        }
      }
    );
  };


//Ajouter une location
const addLocation = async (request, response) =>{
  let body = request.body 
  pool.query('INSERT INTO louer(date_debut, date_fin, heure_debut, heure_fin, status_demande, id_locataire,id_region,numero_chassis,id_facture,id_trajet)VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10)',[body.date_debut, body.date_fin, body.heure_debut, body.heure_fin, body.status_demande, body.id_locataire,body.id_region,body.numero_chassis,body.id_facture,body.id_trajet] ,
      (error, results) => { if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
    }
    response.sendStatus(response.statusCode);
  })
}





//Exporter les fonctions CRUD de la demande d'inscription
module.exports = {
  getLocationsRejetes,
  getLocationsAcceptes,
  addLocation,
};
