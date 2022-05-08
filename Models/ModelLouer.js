// Declaration de variables
const pool = require("../config/config_pool");
const log = require("../config/Logger");

//récupérer la liste des locations pour le service statistiques
const getLocationStatistics = async (request, response) => {
  pool.query(
    "SELECT id_louer, date_debut , status_demande_location, en_cours ,region  FROM louer ",
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

// Recuperer toutes les locations
const getAllLocations = async (request, response) => {
  pool.query(
    "SELECT id_louer, heure_debut, heure_fin,tv.id_type_vehicule, libelle, tarification,latitude_depart,longitude_depart,latitude_arrive,longitude_arrive FROM louer l  inner join vehicule v ON l.numero_chassis=v.numero_chassis inner join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule",
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
const getLocationsEnCours = async (request, response) => {
  pool.query(
    "SELECT id_louer, heure_debut, heure_fin,tv.id_type_vehicule, libelle, tarification,latitude_depart,longitude_depart,latitude_arrive,longitude_arrive,en_cours FROM louer l  inner join vehicule v ON l.numero_chassis=v.numero_chassis inner join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule WHERE en_cours=true",
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
  pool.query(
    "SELECT id_louer, heure_debut, heure_fin,tv.id_type_vehicule, libelle, tarification ,latitude_depart,longitude_depart,latitude_arrive,longitude_arrive,en_cours FROM louer l  inner join vehicule v ON l.numero_chassis=v.numero_chassis inner join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule WHERE en_cours=false",
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
// Recuperer la des locations terminees d'un locataire
const getLocationsTerminesByIdLocataire = async (request, response) => {
  let id = request.params.id;
  pool.query(
    "SELECT * FROM louer l inner join facture f on f.id_louer=l.id_louer inner join vehicule v ON l.numero_chassis=v.numero_chassis inner join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule WHERE en_cours=false and id_locataire=$1",
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
// Recuperer la des locations acceptés pour le service statistiques
const getLocationsAcceptes = async (request, response) => {
  pool.query(
    "SELECT id_louer, date_debut , status_demande_location, en_cours ,region from louer where status_demande_location='accepte' ",
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

// Recuperer la des locations rejetés pour le service statistiques
const getLocationsRejetes = async (request, response) => {
  pool.query(
    "SELECT id_louer, date_debut , status_demande_location, en_cours ,region from louer where status_demande_location='rejete' ",
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

//Fonction pour modifier le champs suivi_location d'une location
const updateLocationSuiviLocation = async (request, response) => {
  let id = request.params.id;
  let date = request.body.suivi_location;
  pool.query(
    "UPDATE louer SET suivi_location=$2 WHERE id_louer=$1",
    [id, date],
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

//Fonction pour modifier le champs heure_debut d'une location
const updateLocationHeureDebut = async (request, response) => {
  let id = request.params.id;
  let date = request.body.heure;
  pool.query(
    "UPDATE louer SET heure_debut=$2 WHERE id_louer=$1",
    [id, date],
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

//Fonction pour modifier le champs heure_fin d'une location
const updateLocationHeureFin = async (request, response) => {
  let id = request.params.id;
  let date = request.body.heure;
  pool.query(
    "UPDATE louer SET heure_fin=$2 WHERE id_louer=$1",
    [id, date],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
    }
  );
};

//Fonction pour terminer un location (en_cours => false)
const endLocation = async (request, response) => {
  let id = request.params.id;
  let heure = request.body.heure;
  pool.query( 
    "UPDATE louer SET en_cours=false, heure_fin=$2 WHERE id_louer=$1",
    [id,heure],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
      response.sendStatus(response.statusCode);
    }
  );
};

//Fonction pour ajouter une locationù
const addLocation = async (request, response) => {
  let body = request.body;
  pool.query(
    "INSERT INTO louer(date_debut,status_demande_location, id_locataire,region,numero_chassis,suivi_location,en_cours,latitude_depart,longitude_depart,latitude_arrive,longitude_arrive)VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11)",
    [
      body.date_debut,
      body.status_demande_location,
      body.id_locataire,
      body.region,
      body.numero_chassis,
      body.suivi_location,
      body.en_cours,
      body.latitude_depart,
      body.longitude_depart,
      body.latitude_arrive,
      body.longitude_arrive,
      
    ],
    (error, results) => {
      if (error) {
        log.loggerConsole.error(error);
        log.loggerFile.error(error);
        response.statusCode = 500;
      }
      response.sendStatus(response.statusCode);
    }
  );
};

// Recuperer une location avec un identifiant
const getLocationById = async (request, response) => {
  let id_louer = request.params.id;
  pool.query(
    "SELECT l.*,tv.id_type_vehicule, libelle, tarification ,f.date_facture,f.montant,f.heure,f.tva FROM louer l   inner join vehicule v ON l.numero_chassis=v.numero_chassis inner join  typevehicule tv ON tv.id_type_vehicule = v.id_type_vehicule  left JOIN facture f  ON l.id_louer=f.id_louer WHERE l.id_louer=$1",
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
  updateLocationHeureFin,
  getLocationsAcceptes,
  getLocationsRejetes,
  getLocationsTerminesByIdLocataire,
  updateLocationSuiviLocation
};
