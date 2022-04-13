// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

// Recuperer la des locations en cours
const getLocationsEnCours = async (request, response) => {
  pool.query(
    "SELECT * FROM louer where en_cours = true",
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

// Recuperer la des locations en cours
const getLocationsLocataire = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "SELECT * FROM louer where en_cours = true and id_locataire =$1",
    [id],
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
// Recuperer la des locations terminees
const getLocationsTermines = async (request, response) => {
    pool.query(
      "SELECT * FROM louer where en_cours = false",
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



  //End location
  const endLocation = async(request,response) =>{
  let id = request.params.id
  pool.query(
    "UPDATE louer SET en_cours=true id_louer=$1",
    [id],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
    }
  );
  }
//Ajouter une location
const addLocation = async (request, response) =>{
  let body = request.body 
  pool.query('INSERT INTO louer(date_debut, date_fin, heure_debut, heure_fin, status_demande_location, id_locataire,id_region,numero_chassis,id_facture,id_trajet,en_cours)VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11)',[body.date_debut, body.date_fin, body.heure_debut, body.heure_fin, body.status_demande_location, body.id_locataire,body.id_region,body.numero_chassis,body.id_facture,body.id_trajet,body.en_cours] ,
      (error, results) => { if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
    }
    response.sendStatus(response.statusCode);
   
  })
}

// Recuperer une location avec un identifiant
const getLocationById = async (request, response) => {
  let id_louer = request.params.id_louer;
  pool.query(
    "SELECT * FROM  WHERE id_louer=$1",
    [id_louer],
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




//Exporter les fonctions CRUD de la demande d'inscription
module.exports = {
 getLocationsEnCours,
 getLocationsTermines,
  addLocation,
  endLocation,
  getLocationById,
  addLocation,
  getLocationsLocataire
};
