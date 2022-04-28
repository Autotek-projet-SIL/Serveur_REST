// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");


//récupérer la liste des locations pour le service statistiques
const getLocationStatistics = async (request, response) => {
  pool.query("SELECT id_louer, date_debut , status_demande_location, en_cours ,region  FROM louer ", (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

// Recuperer toutes les locations
const getAllLocations = async (request, response) => {
  pool.query("SELECT id_louer, heure_debut, heure_fin,tv.id_type_vehicule, libelle, tarification,point_depart, point_arrive FROM louer l inner join trajet t ON l.id_trajet= t.id_trajet inner join vehicule v ON l.numero_chassis=v.numero_chassis inner join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule", (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

// Recuperer la des locations en cours
const getLocationsEnCours = async (request, response) => {
  pool.query("SELECT id_louer, heure_debut, heure_fin,tv.id_type_vehicule, libelle, tarification,point_depart, point_arrive,en_cours FROM louer l inner join trajet t ON l.id_trajet= t.id_trajet inner join vehicule v ON l.numero_chassis=v.numero_chassis inner join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule WHERE en_cours=true", (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

// Recuperer la liste  des locations en cours d'un locataire
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
  pool.query("SELECT id_louer, heure_debut, heure_fin,tv.id_type_vehicule, libelle, tarification,point_depart, point_arrive,en_cours FROM louer l inner join trajet t ON l.id_trajet= t.id_trajet inner join vehicule v ON l.numero_chassis=v.numero_chassis inner join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule WHERE en_cours=false", (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};


// Recuperer la des locations acceptés pour le service statistiques
const getLocationsAcceptes = async (request, response) => {
  pool.query("SELECT id_louer, date_debut , status_demande_location, en_cours ,region from louer where status_demande_location='accepte' ", (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};


// Recuperer la des locations rejetés pour le service statistiques
const getLocationsRejetes = async (request, response) => {
  pool.query("SELECT id_louer, date_debut , status_demande_location, en_cours ,region from louer where status_demande_location='rejete' ", (error, results) => {
    if (error) {
      log.loggerConsole.error(error);
      log.loggerFile.error(error);
      response.sendStatus(500);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const updateLocationHeureDebut = async (request, response) => {
  let id = request.params.id;
  let date = request.body.heure;
  pool.query(
    "UPDATE louer SET heure_debut=$2 WHERE id_louer=$1",
    [id,date],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    }
  );
};

//mettre a jour l'heure de fin
const updateLocationHeureFin = async (request, response) => {
  let id = request.params.id;
  let date = request.body.heure;
  pool.query(
    "UPDATE louer SET heure_fin=$2 WHERE id_louer=$1",
    [id,date],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;

      }
     
    }
  );
};

//End location
const endLocation = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "UPDATE louer SET en_cours=false WHERE id_louer=$1",
    [id],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      } 
    }
  );
};
//Ajouter une location
const addLocation = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO louer(date_debut,status_demande_location, id_locataire,region,numero_chassis,id_trajet,en_cours)VALUES ($1, $2, $3, $4, $5, $6,$7)",
    [
      body.date_debut,
      body.status_demande_location,
      body.id_locataire,
      body.region,
      body.numero_chassis,
      body.id_trajet,
      body.en_cours,
    
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
      
    }
  );
};


// Mettre a jour la disponibilité du véhicule
const updateVehicleDisponible = async (num_chassis=null, response, id_louer=null,disponible) => {
  if ( num_chassis == null) {
   // 
  pool.query(
    "UPDATE vehicule SET disponible=$2 WHERE numero_chassis =(select numero_chassis from louer where id_louer=$1);",
    [id_louer,disponible],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode=500;
      }
      response.sendStatus(response.statusCode);
    }
  );}
  else{
    pool.query(
      "UPDATE vehicule SET disponible=$2 WHERE numero_chassis=$1;",
      [num_chassis,disponible],
      (error, results) => {
        if (error) {
          log.loggerConsole.error(error);
          log.loggerFile.error(error);
          response.statusCode=500;
        }
        response.sendStatus(response.statusCode);
      }
    );

  }
};
// Recuperer une location avec un identifiant
const getLocationById = async (request, response) => {
  let id_louer = request.params.id;
  pool.query(
    "SELECT l.*,tv.id_type_vehicule, libelle, tarification,point_depart, point_arrive,f.date_facture,f.montant,f.heure,f.tva FROM louer l inner join trajet t ON l.id_trajet= t.id_trajet inner join vehicule v ON l.numero_chassis=v.numero_chassis inner join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule  left JOIN facture f  ON l.id_louer=f.id_louer WHERE l.id_louer=$1",
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

//Exporter les fonctions CRUD de la demande de location
module.exports = {
  getLocationsEnCours,
  getLocationsTermines,
  addLocation,
  endLocation,
  getLocationById,
  getLocationsLocataire,
  getAllLocations,
  updateLocationHeureDebut,
  getLocationStatistics,
  updateVehicleDisponible,
  updateLocationHeureFin,
  getLocationsAcceptes,
  getLocationsRejetes

};
